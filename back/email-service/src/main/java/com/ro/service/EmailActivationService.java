package com.ro.service;

import com.ro.dao.VTokenRepository;
import com.ro.dto.UserForEmailService;
import com.ro.dto.UserIdPlusResponseDTO;
import com.ro.model.VerificationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Properties;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class EmailActivationService {

    String myAccountEmail = "springboottest335@gmail.com";

    @Autowired
    VTokenRepository vTRepo;

    public String sendMail(UserForEmailService userFromFront) {
        Properties prop = propertiesPreparation();
        Session session = sessionCreation(prop, myAccountEmail);
        VerificationToken vToken = tokenCreation(userFromFront);
        save(vToken);
        MimeMessage msg = prepareMessage("activation", session, myAccountEmail, userFromFront, vToken);

        try{
            Transport.send(msg);
        }catch(MessagingException ex){
            return "C'e' stato un errore nell'invio della mail";
        }
        return "Email inviata correttamente, controlla la tua mail! (se non la trovi guarda in spam)";
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

    public VerificationToken tokenCreation(UserForEmailService userFromFrontDTO){
        String token = UUID.randomUUID().toString();
        VerificationToken vT = new VerificationToken(
                token,
                userFromFrontDTO.getEmail(),
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(60*24),
                false,
                userFromFrontDTO.getId()
        );
        return vT;
    }

    private void save(VerificationToken vToken){
        vTRepo.save(vToken);
    }

    private MimeMessage prepareMessage(String reasonToSend, Session ses, String myAccountEmail, UserForEmailService user, VerificationToken vToken) {
        try {
            MimeMessage msg = new MimeMessage(ses);
            msg.setFrom(new InternetAddress(myAccountEmail));
            msg.setRecipients(MimeMessage.RecipientType.TO, String.valueOf(new InternetAddress(user.getEmail())));

            if (reasonToSend.equals("activation")){
                msg.setSubject("Row And Order: Account activation");
                msg.setText("Ciao " + user.getUsername() + ", Ti manca ancora un passaggio per completare la tua registrazione, " +
                        "\nClicca sul link sottostante per attivare il tuo account!" +
                        "\n" +
                        "\nhttp://localhost:4200/activation/" + vToken.getToken());
            }
            else if (reasonToSend.equals("recovery")) {
                msg.setSubject("Row And Order: Password recovery");
                msg.setText("Ciao " + user.getUsername() + ", Cliccando sul link qui sotto, " +
                        "\nPotrai cambiare la tua password e accedere nuovamente al tuo account!" +
                        "\n" +
                        "\nhttp://localhost:4200/forgotPassword/" + user.getId() + "/" + user.getEmail() + "/" + vToken.getToken());
            }

            return msg;
        } catch (MessagingException ex) {
            Logger.getLogger(EmailActivationService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public String sendRecoveryMail(UserForEmailService userFromFrontDTO) {
        try {
            Properties prop = propertiesPreparation();
            Session session = sessionCreation(prop, myAccountEmail);

            if (doesEnabledTokenExists(userFromFrontDTO.getEmail())) {
                return "Procedura già avviata controlla la mail anche nella cartella spam!";
            } else {
                // La lista è vuota, quindi nessun token abilitato per quell'email
                VerificationToken vToken = tokenCreation(userFromFrontDTO);

                save(vToken);
                MimeMessage msg = prepareMessage("recovery", session, myAccountEmail, userFromFrontDTO, vToken);
                Transport.send(msg);
            }
        } catch (MessagingException ex) {
            return "C'è stato un errore nell'invio della mail";
        }
        return "Email inviata correttamente, controlla la tua mail! (se non la trovi guarda in spam)";
    }



    public UserIdPlusResponseDTO confirmEmail(String token){
        VerificationToken vTokenFromDb = vTRepo.findByToken(token).orElseThrow(() -> new IllegalStateException("token not found"));
        UserIdPlusResponseDTO responseDTO = new UserIdPlusResponseDTO();

        responseDTO.setUserId(vTokenFromDb.getUserId());

        if (vTokenFromDb.getConfirmedAt() != null) {
            responseDTO.setResponse("Email gia confermata!");
            return responseDTO;
        }

        if (vTokenFromDb.getExpiredAt().isBefore(LocalDateTime.now())) {
            responseDTO.setResponse("Token scaduto! Procedere nuovamente alla registrazione se si desidera creare un account");
            return responseDTO;
        }

        vTokenFromDb.setConfirmedAt(LocalDateTime.now());
        vTokenFromDb.setEnabled(true);

        Long userToUpdate = vTokenFromDb.getUserId();
        enbaleUser(userToUpdate);
        responseDTO.setResponse("Stato validazione " + vTokenFromDb.getUserId() + ": " + vTokenFromDb.isEnabled());
        return responseDTO;
    }

    public void enbaleUser(Long userIdToUpdate){
        VerificationToken vToken = getToken(userIdToUpdate);
        vToken.setEnabled(true);
        save(vToken);
    }

    public String confirmRecoverPassword(String token){
        VerificationToken vTokenFromDb = vTRepo.findByToken(token).orElseThrow(() -> new IllegalStateException("token not found"));

        if (vTokenFromDb.getConfirmedAt() != null) {
            return "Token gia confermato! Ripetere la procedura da capo se si desidera cambiare nuovamente la password!";
        }

        if (vTokenFromDb.getExpiredAt().isBefore(LocalDateTime.now())) {
            return "Token scaduto! Ripetere la procedura da capo se si desidera cambiare nuovamente la password!";
        }

        vTokenFromDb.setConfirmedAt(LocalDateTime.now());
        vTokenFromDb.setEnabled(true);

        // Salva l'entità modificata nel database
        vTRepo.save(vTokenFromDb);

        return "Confermato!";
    }

    public boolean doesEnabledTokenExists(String email){
        List<VerificationToken> tokens = vTRepo.findByEmail(email);
        return tokens.stream().anyMatch(token -> !token.isEnabled());
    }

    public VerificationToken getToken(Long userId){
        return vTRepo.findByUserId(userId).orElseThrow(() -> new IllegalStateException("token not found"));
    }
}