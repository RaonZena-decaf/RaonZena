package com.ssafy.raonzena.api.service;


import com.ssafy.raonzena.api.request.BoardReq;
import com.ssafy.raonzena.api.request.GameScoreReq;
import com.ssafy.raonzena.api.response.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface GameService {

    boolean saveFeed(MultipartFile multipartFile, BoardReq boardReq);

    //게임데이터 1개 - 정답만
    GameAnswer answer(int gameType);

    //게임데이터 5개 - 정답만
    List<GameAnswer> answerList();

    //게임데이터 - 정답 + 이미지
    GameAnswerAndImageRes answerAndImage();

    //게임데이터 - 인생역전
    List<ChanceRes> chanceGameData(List<Integer> randomNo);

    //테마 불러오기
    List<ImageThemeRes> getFrame(long userNo);

    // 게임 데이터 저장하기
    void saveGameScore(GameScoreReq gameScoreReq);

    // 게임 데이터 저장하기
    GameScoreRes findGameScore(long roomNo);

    // 캐치마인드 그림 저장하기
    void savePainting(String painting, long roomNo);

    // 캐치마인드 그림 보내기
    String findPainting(long roomNo);
}
