package com.ssafy.raonzena.api.controller;


import com.ssafy.raonzena.api.request.BoardReq;
import com.ssafy.raonzena.api.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1/games")
@RestController
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping("/feed/{userNo}")
    public ResponseEntity<?> saveFeed(@PathVariable long userNo, @RequestBody BoardReq boardReq){
        gameService.saveFeed(boardReq);
        return ResponseEntity.ok("Success");
    }
}
