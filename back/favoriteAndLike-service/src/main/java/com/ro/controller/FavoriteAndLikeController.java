package com.ro.controller;

import com.ro.dto.FavoriteAndLikeDTO;
import com.ro.service.FavoriteAndLikeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/favouriteAndLike")
@CrossOrigin(origins = "http://localhost:4200") // Consentire le richieste da localhost:4200
public class FavoriteAndLikeController {

    @Autowired
    private FavoriteAndLikeService favoriteAndLikeService;

    @GetMapping("/findByUserId")
    public List<FavoriteAndLikeDTO> findByUserId(@RequestParam("userId") Long userId) {
        return favoriteAndLikeService.findByUserId(userId);
    }

    @GetMapping("/readByUserIdAndMovieId")
    public FavoriteAndLikeDTO findByUserIdAndMovieId(
            @RequestParam("userId") Long userId,
            @RequestParam("movieId") Long movieId) {
        return favoriteAndLikeService.findByUserIdAndMovieId(userId, movieId);
    }

    @GetMapping("/getAll")
    public List<FavoriteAndLikeDTO> getAll() {
        return favoriteAndLikeService.getAll();
    }

    @PostMapping ("/create")
    public FavoriteAndLikeDTO create(@RequestBody FavoriteAndLikeDTO dto) {
        System.out.println(dto);
        return favoriteAndLikeService.create(dto);
    }

    @GetMapping ("/read")
    public FavoriteAndLikeDTO read (@RequestParam("id") Long id) {
        return favoriteAndLikeService.read(id);
    }

    @PutMapping("/update")
    public FavoriteAndLikeDTO update (@RequestBody FavoriteAndLikeDTO dto) {
        return favoriteAndLikeService.update(dto);
    }

    @DeleteMapping("/delete")
    public void delete (@RequestParam("id")  Long id) {
        favoriteAndLikeService.delete(id);
    }

}