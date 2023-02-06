package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.request.BoardReq;
import com.ssafy.raonzena.api.response.GameAnswer;
import com.ssafy.raonzena.api.response.GameAnswerAndImageRes;

public interface GameService {

    boolean saveFeed(BoardReq boardReq);

    //게임데이터 - 정답만
    GameAnswer answer(int gameType);

    //게임데이터 - 정답 + 이미지
    GameAnswerAndImageRes answerAndImage(int gameType);
}
