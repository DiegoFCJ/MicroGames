package com.tnv.userManager.service;

import com.sun.mail.smtp.SMTPAddressFailedException;
import com.tnv.userManager.model.User;
import com.tnv.userManager.model.VerificationToken;
import com.tnv.userManager.repository.UserRepository;
import com.tnv.userManager.repository.VerificationTokenRepo;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
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
                                      UserRepository userRepository,
                                      JpaUserDetailsService userServ) {
        this.vTRepo = vTRepo;
        this.userRepository = userRepository;
        this.userServ = userServ;
    }


    private void save(VerificationToken vToken){
        vTRepo.save(vToken);
    }

    public String sendMail(User user) throws MessagingException {

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


        try{
            Transport.send(msg);
        }catch(SMTPAddressFailedException ex){
            return "Email Non valida, non siamo riusciti a inviare la mail ";
        }
        return " ora controlla la mail e clicca sul link che ti abbiamo inviato!";
    }

    private MimeMessage prepareMessage(Session ses, String myAccountEmail, User user, VerificationToken vToken) {
        try {
            MimeMessage msg = new MimeMessage(ses);
            msg.setFrom(new InternetAddress(myAccountEmail));
            msg.setRecipients(MimeMessage.RecipientType.TO, String.valueOf(new InternetAddress(user.getEmail())));
            msg.setSubject("Row And Order: Account activation");
            msg.setText("Hi " + user.getName() + ", you almost done with the registration process! " +
                    "\nYou just have to click the link below to Activate your account!" +
                    "\n" +
                    "http://localhost:8080/api/public/activation?token=" + vToken.getToken());
            return msg;
        } catch (MessagingException ex) {
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
        return "" +
                "<style>\n" +
                "    *{\n" +
                "        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;\n" +
                "    }\n" +
                "\n" +
                "    .testo p{\n" +
                "        text-shadow: -2px 1px 3px rgb(30, 28, 28);\n" +
                "        text-align: center;\n" +
                "        position: absolute;\n" +
                "        top: 30%;\n" +
                "        left: 50%;\n" +
                "        transform: translate(-50%);\n" +
                "    }\n" +
                "\n" +
                "    .tit{\n" +
                "        font-size: 80px;\n" +
                "    }\n" +
                "\n" +
                "    .tex{\n" +
                "        margin-top: 170px;\n" +
                "        padding-bottom: 20px;\n" +
                "        font-size: 40px;\n" +
                "    }\n" +
                "\n" +
                "    .tasto {\n" +
                "      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;\n" +
                "      cursor: pointer;\n" +
                "      text-shadow: -2px 1px 3px rgb(30, 28, 28);\n" +
                "      background-color: #c02936;\n" +
                "      color: white;\n" +
                "      padding: 30px;\n" +
                "      border-radius: 20px;\n" +
                "      font-size: 40px;\n" +
                "      border: none;\n" +
                "    }\n" +
                "\n" +
                "    .tasto-pos{\n" +
                "      cursor: pointer;\n" +
                "      position: absolute;\n" +
                "      top: 60%;\n" +
                "      left: 50%;\n" +
                "      transform: translate(-50%);\n" +
                "      transition: all 1s;\n" +
                "    }\n" +
                "\n" +
                "    .tasto:hover{\n" +
                "      cursor: pointer;\n" +
                "      background-color: white;\n" +
                "      color: #c02936;\n" +
                "      box-shadow: -10px -6px 20px 2px red;\n" +
                "  animation: reverse;\n" +
                "    }\n" +
                "\n" +
                "    </style>\n" +
                "\n" +
                "<div class=\"testo\">\n" +
                "    <p class=\"tit\">Congratulazioni!!</p>\n" +
                "    <p class=\"tex\">Il tuo account é stato attivato!</p>\n" +
                "</div>\n" +
                "\n" +
                "<div class=\"tasto-pos\" >\n" +
                "    <button class=\"tasto\" onclick=window.location.href=\"http://localhost:4200/sign\";>Esegui Il Login</button>\n" +
                "</div>";
    }

    public String enbaleUser(Long userIdToUpdate){
        User user = userServ.getUser(userIdToUpdate);
        user.setEnabled(true);
        userServ.save(user);
        return user.toString();
    }

}
/*
<style>
    *{
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    .testo p{
        text-shadow: -2px 1px 3px rgb(30, 28, 28);
        text-align: center;
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%);
    }

    .tit{
        font-size: 80px;
    }

    .tex{
        margin-top: 170px;
        padding-bottom: 20px;
        font-size: 40px;
    }

    .tasto {
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      cursor: pointer;
      text-shadow: -2px 1px 3px rgb(30, 28, 28);
      background-color: #c02936;
      color: white;
      padding: 30px;
      border-radius: 20px;
      font-size: 40px;
      border: none;
    }

    .tasto-pos{
      cursor: pointer;
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%);
      transition: all 1s;
    }

    .tasto:hover{
      cursor: pointer;
      background-color: white;
      color: #c02936;
      box-shadow: -10px -6px 20px 2px red;
  animation: reverse;
    }

    </style>

<div class="testo">
    <p class="tit">Congratulazioni!!</p>
    <p class="tex">Il tuo account é stato attivato!</p>
</div>

<div class="tasto-pos" >
    <button class="tasto" onclick=window.location.href="http://localhost:4200/sign";>Esegui Il Login</button>
</div>
*/
