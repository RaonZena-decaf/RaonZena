package com.ssafy.raonzena.api.service;


import com.ssafy.raonzena.api.request.BoardReq;
import com.ssafy.raonzena.api.request.GameScoreReq;
import com.ssafy.raonzena.api.response.GameAnswer;
import com.ssafy.raonzena.api.response.GameAnswerAndImageRes;
import com.ssafy.raonzena.api.response.GameScoreRes;
import com.ssafy.raonzena.api.response.ImageThemeRes;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface GameService {

    boolean saveFeed(MultipartFile multipartFile, BoardReq boardReq);

    //게임데이터 - 정답만
    GameAnswer answer(int gameType);

    //게임데이터 - 정답 + 이미지
    GameAnswerAndImageRes answerAndImage(int gameType);

    //테마 불러오기
    List<ImageThemeRes> getFrame(long userNo);

    // 게임 데이터 저장하기
    void saveGameScore(GameScoreReq gameScoreReq);

    // 게임 데이터 저장하기
    GameScoreRes findGameScore(long roomNo);
}
