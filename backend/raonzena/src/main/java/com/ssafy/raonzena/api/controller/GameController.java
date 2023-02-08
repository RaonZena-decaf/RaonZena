package com.ssafy.raonzena.api.controller;



import com.ssafy.raonzena.api.request.BoardReq;
import com.ssafy.raonzena.api.request.GameScoreReq;
import com.ssafy.raonzena.api.response.GameScoreRes;
import com.ssafy.raonzena.api.response.ImageThemeRes;
import com.ssafy.raonzena.api.response.UserRes;
import com.ssafy.raonzena.api.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.List;

@RequestMapping("/api/v1/games")
@RestController
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping("/feed")
    public ResponseEntity<?> saveFeed(@RequestPart(value = "file",required = false) MultipartFile multipartFile, @RequestPart(value="boardReq") BoardReq boardReq){
        System.out.println("check");
        gameService.saveFeed(multipartFile,boardReq);
        return ResponseEntity.ok("Success");
    }

    // 게임 점수 저장
    @PostMapping("/liveScore")
    public ResponseEntity<?> gameScoreSave(@RequestBody GameScoreReq gameScoreReq){
        gameService.saveGameScore(gameScoreReq);
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

    //테마 보여주기
    @GetMapping("/feed/frame")
    public ResponseEntity<List<ImageThemeRes>> getFrame(HttpSession session){
        //session에서 userNo 받음
        long userNo = Long.parseLong(session.getAttribute("userNo").toString());

        return ResponseEntity.ok(gameService.getFrame(userNo));

    }

    @GetMapping("/games/livesScore/{roomNo}")
    public ResponseEntity<GameScoreRes> gameScoreList(@PathVariable int roomNo){
        // 게임데이터 조회
        return ResponseEntity.ok(gameService.findGameScore(roomNo));
    }

}
