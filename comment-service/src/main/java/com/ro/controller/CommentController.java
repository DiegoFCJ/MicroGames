package com.ro.controller;

import com.ro.dto.CommentDTO;
import com.ro.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/comment")
@CrossOrigin(origins = "http://localhost:4200") // Consentire le richieste da localhost:4200
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/getAll")
    public List<CommentDTO> getAll() {
        return commentService.getAll();
    }

    @GetMapping("/readByUserIdAndMovieId")
    public List<CommentDTO> getAllByUserIdAndMovieId(
            @RequestParam("userId") Long userId,
            @RequestParam("movieId") Long movieId) {
        return commentService.getAllByUserIdAndMovieId(userId, movieId);
    }

    @GetMapping("/readByMovieId")
    public List<CommentDTO> getAllByUserIdAndMovieId(
            @RequestParam("movieId") Long movieId) {
        return commentService.getAllByMovieId(movieId);
    }

    @PostMapping ("/create")
    public CommentDTO create(@RequestBody CommentDTO dto) {
        return commentService.create(dto);
    }

    @GetMapping ("/read")
    public CommentDTO read (@RequestParam("id") Long id) {
        return commentService.read(id);
    }

    @PutMapping("/update")
    public CommentDTO update (@RequestBody CommentDTO dto) {
        return commentService.update(dto);
    }

    @DeleteMapping("/delete")
    public void delete (@RequestBody CommentDTO dto) {
        commentService.delete(dto);
    }

}