package com.ro.controller;

import com.ro.dto.RatingDTO;
import com.ro.service.RatingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/rating")
@CrossOrigin(origins = "http://localhost:4200") // Consentire le richieste da localhost:4200
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @GetMapping("/readByUserIdAndMovieId")
    public RatingDTO getAllByUserIdAndMovieId(
            @RequestParam("userId") Long userId,
            @RequestParam("movieId") Long movieId) {
        return ratingService.getAllByUserIdAndMovieId(userId, movieId);
    }
    @GetMapping("/getAll")
    public List<RatingDTO> getAll() {
        return ratingService.getAll();
    }

    @PostMapping("/create")
    public RatingDTO create(@RequestBody RatingDTO dto) {
        System.out.println(dto);
        return ratingService.create(dto);
    }

    @GetMapping ("/read")
    public RatingDTO read (@RequestParam("id") Long id) {
        return ratingService.read(id);
    }

    @PutMapping("/update")
    public RatingDTO update (@RequestBody RatingDTO dto) {
        return ratingService.update(dto);
    }

    @DeleteMapping("/delete")
    public void delete (@RequestBody RatingDTO dto) {
        ratingService.delete(dto);
    }

}