package com.ro.dto;
import com.ro.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordRecoveryResponseDTO {
    private PasswordRecoveryDTO user;
    private String message;

}
