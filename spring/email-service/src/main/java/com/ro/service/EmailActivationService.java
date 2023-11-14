package com.ro.service;

import com.ro.dao.VerificationTokenRepo;
import com.ro.model.User;
import com.ro.model.VerificationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.Properties;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;


@Service
public class EmailActivationService {

    String myAccountEmail = "springboottest335@gmail.com";

    @Autowired
    private VerificationTokenRepo vTRepo;

    @Autowired
    private JpaUserDetailsService userServ;

    private void save(VerificationToken vToken){
        vTRepo.save(vToken);
    }

    public String sendMail(User userFromFront) {
        User userFromDb = userServ.getUserByUsername(userFromFront.getUsername());

        Properties prop = propertiesPreparation();
        Session session = sessionCreation(prop, myAccountEmail);
        VerificationToken vToken = tokenCreation(userFromDb);
        save(vToken);
        MimeMessage msg = prepareMessage("activation", session, myAccountEmail, userFromDb, vToken);

        try{
            Transport.send(msg);
        }catch(MessagingException ex){
            return "C'e' stato un errore nell'invio della mail";
        }
        return "Email inviata correttamente, controlla la tua mail! (se non la trovi guarda in spam)";
    }

    public String sendRecoveryMail(String email) {
        User userFromDb;
        if(userServ.doesEmailExists(email)){
            userFromDb = userServ.getUserByEmail(email);
            Properties prop = propertiesPreparation();
            Session session = sessionCreation(prop, myAccountEmail);
            VerificationToken vToken = tokenCreation(userFromDb);
            save(vToken);
            MimeMessage msg = prepareMessage("recovery", session, myAccountEmail, userFromDb, vToken);

            try{
                Transport.send(msg);
            }catch(MessagingException ex){
                return "C'e' stato un errore nell'invio della mail";
            }
            return "Email inviata correttamente, controlla la tua mail! (se non la trovi guarda in spam)";
        }
        return "La mail che hai inserito non e' collegata a nessun account";
    }

    private MimeMessage prepareMessage(String reasonToSend, Session ses, String myAccountEmail, User user, VerificationToken vToken) {
        try {
            MimeMessage msg = new MimeMessage(ses);
            msg.setFrom(new InternetAddress(myAccountEmail));
            msg.setRecipients(MimeMessage.RecipientType.TO, String.valueOf(new InternetAddress(user.getEmail())));

            if (reasonToSend.equals("activation")){
                msg.setSubject("Row And Order: Account activation");
                msg.setText("Ciao " + user.getName() + ", Ti manca ancora un passaggio per completare la tua registrazione, " +
                        "\nClicca sul link sottostante per attivare il tuo account!" +
                        "\n" +
                        "\nhttp://localhost:4200/activation/" + vToken.getToken());
            }
            else if (reasonToSend.equals("recovery")) {
                msg.setSubject("Row And Order: Password recovery");
                msg.setText("Ciao " + user.getName() + ", Cliccando sul link qui sotto, " +
                        "\nPotrai cambiare la tua password e accedere nuovamente al tuo account!" +
                        "\n" +
                        "\nhttp://localhost:4200/forgotPassword/" + user.getEmail() + "/" + vToken.getToken());
            }

            return msg;
        } catch (MessagingException ex) {
            Logger.getLogger(EmailActivationService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public String confirmEmail(String token){
        VerificationToken vTokenFromDb = vTRepo.findByToken(token).orElseThrow(() -> new IllegalStateException("token not found"));

        if (vTokenFromDb.getConfirmedAt() != null) {
            return "Email gia confermata!";
        }

        if (vTokenFromDb.getExpiredAt().isBefore(LocalDateTime.now())) {
            return "Token scaduto! Procedere nuovamente alla registrazione se si desidera creare un account";
        }

        vTokenFromDb.setConfirmedAt(LocalDateTime.now());

        Long userIdToUpdate = vTokenFromDb.getUser().getId();
        enbaleUser(userIdToUpdate);
        return "Stato validazione " + vTokenFromDb.getUser().getUsername() + ": " + vTokenFromDb.getUser().getAuthorities();
    }

    public void enbaleUser(Long userIdToUpdate){
        User user = userServ.getUser(userIdToUpdate);
        user.setEnabled(true);
        userServ.save(user);
    }

    public VerificationToken tokenCreation(User userFromDb){
        String token = UUID.randomUUID().toString();

        return new VerificationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(60*24),
                userFromDb
        );
    }

    public Properties propertiesPreparation(){
        Properties prop = new Properties();
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true");
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");
        return prop;
    }

    public Session sessionCreation(Properties prop, String myAccountEmail){
        String Password = "riqoewmglaebowme";
        return Session.getInstance(prop, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(myAccountEmail, Password);
            }
        });
    }

    public ResponseEntity<String> updateUserPass(User user, String token){
        VerificationToken vTokenFromDb = vTRepo.findByToken(token).orElseThrow(() -> new IllegalStateException("token not found"));

        if (vTokenFromDb.getConfirmedAt() != null) {
            return ResponseEntity.ok("Token gia confermato! Ripetere la procedura da capo se si desidera cambiare nuovamente la password!");
        }

        if (vTokenFromDb.getExpiredAt().isBefore(LocalDateTime.now())) {
            return ResponseEntity.ok("Token scaduto! Ripetere la procedura da capo se si desidera cambiare nuovamente la password!");
        }

        vTokenFromDb.setConfirmedAt(LocalDateTime.now());
        String response = userServ.updateUserChoice(user, "password");

        return ResponseEntity.ok(response);

    }
}