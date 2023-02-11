package com.ssafy.raonzena.api.controller;



import com.ssafy.raonzena.api.request.BoardReq;
import com.ssafy.raonzena.api.request.GameScoreReq;
import com.ssafy.raonzena.api.response.ChanceRes;
import com.ssafy.raonzena.api.response.GameScoreRes;
import com.ssafy.raonzena.api.response.ImageThemeRes;
import com.ssafy.raonzena.api.response.UserRes;
import com.ssafy.raonzena.api.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    // 캐치마인드 그림 송신
    @PostMapping("/{roomNo}/catchMind")
    public ResponseEntity<?> paintingSave(@PathVariable long roomNo, @RequestBody String painting){
        gameService.savePainting(painting,roomNo);
        return ResponseEntity.ok("Success");
    }

    // 캐치마인드 그림 수신
    @GetMapping("/{roomNo}/catchMind")
    public ResponseEntity<?> paintingDetails(@PathVariable long roomNo){
        return ResponseEntity.ok(gameService.findPainting(roomNo));
    }

    //게임데이터 (인생역전 제외)
    @GetMapping("/gameType/{gameType}")
    public ResponseEntity<?> gameData(@PathVariable int gameType) {
        //- 1 : 채팅 주제
        //- 2 : 캐치마인드
        //- 3 : 고요속의 외침
        if(gameType == 3){
            return ResponseEntity.ok(gameService.answerList());
        }
        if (gameType == 4) {
            return ResponseEntity.ok(gameService.answerAndImage());
        }

        return ResponseEntity.ok(gameService.answer(gameType));
    }

    //게임데이터 (인생역전)
    @GetMapping("/gameType/chanceGame")
    public ResponseEntity<List<ChanceRes>> chanceGameData(@RequestParam("randomNo") String randomNo){

        String randomNums = randomNo.substring(1,randomNo.length()-1);
        ArrayList<Integer> randomData = new ArrayList<>(Arrays.stream(randomNums.split(","))
                .map(Integer::parseInt)
                .collect(Collectors.toList()));

        return ResponseEntity.ok(gameService.chanceGameData(randomData));
    }


    //테마 보여주기
    @GetMapping("/feed/frame")
    public ResponseEntity<List<ImageThemeRes>> getFrame(HttpSession session){
        //session에서 userNo 받음
        long userNo = Long.parseLong(session.getAttribute("userNo").toString());

        return ResponseEntity.ok(gameService.getFrame(userNo));

    }

    @GetMapping("/liveScore/{roomNo}")
    public ResponseEntity<GameScoreRes> gameScoreList(@PathVariable long roomNo){
        // 게임데이터 조회
        return ResponseEntity.ok(gameService.findGameScore(roomNo));
    }

    @GetMapping("/{roomNo}/join")
    public ResponseEntity<?> headCountDetails(@PathVariable long roomNo){
        // 방에 참여중인 인원수 조회
        if (gameService.findActiveHeadCount(roomNo)>-1){
            return ResponseEntity.ok(gameService.findActiveHeadCount(roomNo));
        }
        // 방이 없으면 noContent 반환
        return ResponseEntity.noContent().build();
    }

//    @PutMapping("/{roomNo}/join")
//    public ResponseEntity<?> headCountSave(@PathVariable long roomNo, @RequestBody int headCount){
//        // 참여인원수 저장
//        gameService.saveActiveHeadCount(roomNo,headCount);
//        return ResponseEntity.ok("Success");
//    }

    @PutMapping("/{roomNo}/join")
    public ResponseEntity<?> headCountSave(@PathVariable long roomNo, @RequestBody Map<String, Integer> request){
        // 참여인원수 저장
        gameService.saveActiveHeadCount(roomNo,request.get("headCount"));
        return ResponseEntity.ok("Success");
    }

}
