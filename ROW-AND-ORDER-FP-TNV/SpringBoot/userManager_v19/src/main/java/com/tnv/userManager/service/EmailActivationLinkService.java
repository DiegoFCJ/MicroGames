package com.tnv.userManager.service;

import com.tnv.userManager.model.User;
import com.tnv.userManager.model.VerificationToken;
import com.tnv.userManager.repository.UserRepository;
import com.tnv.userManager.repository.VerificationTokenRepo;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Properties;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class EmailActivationLinkService {

    private final VerificationTokenRepo vTRepo;
    private final UserRepository userRepository;
    private final JpaUserDetailsService userServ;

    @Autowired
    public EmailActivationLinkService(VerificationTokenRepo vTRepo,
                                      UserRepository userRepository, JpaUserDetailsService userServ) {
        this.vTRepo = vTRepo;
        this.userRepository = userRepository;
        this.userServ = userServ;
    }

    private void save(VerificationToken vToken){
        vTRepo.save(vToken);
    }

    public void sendMail(User user) throws MessagingException {

        String token = UUID.randomUUID().toString();
        Properties prop = new Properties();
        String myAccountEmail = "springboottest335@gmail.com";
        String Password = "riqoewmglaebowme";
        Session session = Session.getInstance(prop, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(myAccountEmail, Password);
            }
        });
        VerificationToken vToken = new VerificationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(60*24),
                user
        );

        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true");
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");

        save(vToken);

        MimeMessage msg = prepareMessage(session, myAccountEmail, user, vToken);

        Transport.send(msg);
    }

    private MimeMessage prepareMessage(Session ses, String myAccountEmail, User user, VerificationToken vToken){
        try{
            MimeMessage msg = new MimeMessage(ses);
            msg.setFrom(new InternetAddress(myAccountEmail));
            msg.setRecipients(MimeMessage.RecipientType.TO, String.valueOf(new InternetAddress(user.getEmail())));
            msg.setSubject("Row And Order: Account activation");
            msg.setText("Hi " + user.getName() + ", you almost done with the registration process! " +
                    "\nYou just have to click the link below to Activate your account!" +
                    "\n" +
                    "http://localhost:8080/api/public/activation?token=" + vToken.getToken());
            return msg;
        }catch (MessagingException ex){
            Logger.getLogger(JavaMailSender.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public String confirmEmail(String token){
        VerificationToken vTokenFromDb = vTRepo.findByToken(token).orElseThrow(() -> new IllegalStateException("token not found"));

        if (vTokenFromDb.getConfirmedAt() != null) {throw new IllegalStateException("Email already confirmed");}

        if (vTokenFromDb.getExpiredAt().isBefore(LocalDateTime.now())) {throw new IllegalStateException("token expired");}

        if (vTokenFromDb.getConfirmedAt() != null) {throw new IllegalStateException("Email already confirmed");}

        vTokenFromDb.setConfirmedAt(LocalDateTime.now());

        Long userIdToUpdate = vTokenFromDb.getUser().getId();
        enbaleUser(userIdToUpdate);
        return "Your Account has been activated!  " +
                "<button onclick=window.location.href=\"http://localhost:4200/login\"; >Click for login</button>";
    }

    public String enbaleUser(Long userIdToUpdate){
        User user = userServ.getUser(userIdToUpdate);
        user.setEnabled(true);
        user.setUpdate_on(LocalDateTime.now());
        userServ.save(user);
        return user.toString();
    }

}
