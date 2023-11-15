package com.ro.controller;

import com.ro.dto.ScoreDTO;
import com.ro.service.ScoreService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/score")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    @GetMapping("getTotalScoreByUsername")
    public int getTotalScoreByUsername(int id){
        return scoreService.getTotalScoreOfUserByUserId(id);
    }

    @GetMapping("/getAll")
    public List<ScoreDTO> getAll() {
        return scoreService.getAll();
    }

    @PostMapping ("/create")
    public ScoreDTO create(@RequestBody ScoreDTO dto) {
        return scoreService.create(dto);
    }

    @GetMapping ("/read")
    public ScoreDTO read (@RequestParam("id") Long id) {
        return scoreService.read(id);
    }

    @PutMapping("/update")
    public ScoreDTO update (@RequestBody ScoreDTO dto) {
        return scoreService.update(dto);
    }

    @DeleteMapping("/delete")
    public void delete (@RequestBody ScoreDTO dto) {
        scoreService.delete(dto);
    }

}