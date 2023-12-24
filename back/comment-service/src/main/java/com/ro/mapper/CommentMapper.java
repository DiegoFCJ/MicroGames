package com.ro.mapper;

import com.ro.dto.CommentDTO;
import com.ro.model.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface CommentMapper {

    CommentMapper INSTANCE = Mappers.getMapper(CommentMapper.class);

    CommentDTO mapToDTO(Comment comment);

    Comment mapToEntity(CommentDTO commentDTO);

    List<CommentDTO> mapToDTOList(Iterable<Comment> comments);
}

