package com.ro.Mapper;

import com.ro.dto.PasswordRecoveryDTO;
import com.ro.dto.PasswordRecoveryResponseDTO;
import com.ro.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    default PasswordRecoveryDTO mapToPassRecResDTO(User user){
        return new PasswordRecoveryDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail()
        );
    }
}