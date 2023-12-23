package com.ro.service;

import com.ro.dao.CommentRepository;
import com.ro.dto.CommentDTO;
import com.ro.mapper.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    CommentMapper commentMapper = CommentMapper.INSTANCE;

    @Autowired
    CommentRepository commentRepository;


    public List<CommentDTO> getAll() {
        return commentRepository.findAll().stream()
                .map(commentMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    public CommentDTO create(CommentDTO commentDTO) {
        return commentMapper.mapToDTO(commentRepository.save(commentMapper.mapToEntity(commentDTO)));
    }

    public CommentDTO read(long id) {
        return commentMapper.mapToDTO(commentRepository.findById(id).get());
    }

    public CommentDTO update(CommentDTO dto) {
        return commentMapper.mapToDTO(commentRepository.save(commentMapper.mapToEntity(dto)));
    }

    public void delete(CommentDTO dto) {
        commentRepository.deleteById(dto.getId());
    }
}
