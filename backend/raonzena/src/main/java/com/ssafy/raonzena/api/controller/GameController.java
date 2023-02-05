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

    //게임데이터
    @GetMapping("/gameType/{gameType}")
    public ResponseEntity<?> gameData(@PathVariable int gameType){
        //- 1 : 채팅 주제
        //- 2 : 고요속의 외침 , 캐치마인드
        //- 3 : 특정 물건 빨리 가져오기
        //- 4 : 인물퀴즈

        if(gameType == 4){
            return ResponseEntity.ok(gameService.answerAndImage(gameType));
        }

        return ResponseEntity.ok(gameService.answer(gameType));
    }


}
