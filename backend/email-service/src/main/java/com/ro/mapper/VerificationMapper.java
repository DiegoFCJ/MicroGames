package com.ro.mapper;

import com.ro.dto.VerificationDTO;
import com.ro.model.VerificationToken;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface VerificationMapper {

    VerificationMapper INSTANCE = Mappers.getMapper(VerificationMapper.class);

    VerificationDTO mapToDTO(VerificationToken verification);

    List<VerificationDTO> mapToDTOList(Iterable<VerificationToken> verifications);

    default VerificationToken mapToEntity(VerificationDTO verificationDTO) {
        return new VerificationToken(
                verificationDTO.getId(),
                verificationDTO.getToken(),
                verificationDTO.getUser().getEmail(),
                verificationDTO.getCreatedAt(),
                verificationDTO.getExpiredAt(),
                verificationDTO.getConfirmedAt(),
                verificationDTO.isEnabled(),
                verificationDTO.getUser().getId()
        );

    }
}

