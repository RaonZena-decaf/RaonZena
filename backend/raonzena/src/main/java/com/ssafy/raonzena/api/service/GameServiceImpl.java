package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.request.BoardReq;
import com.ssafy.raonzena.api.response.GameAnswer;
import com.ssafy.raonzena.api.response.GameAnswerAndImageRes;
import com.ssafy.raonzena.db.entity.*;
import com.ssafy.raonzena.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class GameServiceImpl implements GameService{

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    GameChatRepository gameChatRepository;

    @Autowired
    GameObjectFastRepository gameObjectFastRepository;

    @Autowired
    GameSpeakAndDrawRepository gameSpeakAndDrawRepository;

    @Autowired
    GamePersonQuizRepository gamePersonQuizRepository;

    //===============================================================
    //더미데이터 넣으면 아래 코드로 바꾸기! -> 더미데이터들 수 다 통일하기
//        static int min = 1;
//        static int max = 100;
//        static int randomNo = (int) ((Math.random() * (max - min)) + min);
    static int randomNo = 1;
    //===============================================================


    @Override
    public boolean saveFeed(BoardReq boardReq) {

        Board check = boardRepository.save(boardReq.toEntity());
        return check != null ? true : false;
    }

    @Override
    public GameAnswer answer(int gameType) {
        //- 1 : 채팅 주제
        //- 2 : 고요속의 외침 , 캐치마인드
        //- 3 : 특정 물건 빨리 가져오기


        if(gameType == 1){
            Chat data =  gameChatRepository.findByChatNo(randomNo);
            GameAnswer answer = new GameAnswer(data.getTopic());
           return answer;
        }else if (gameType == 2){
            SpeakAndDraw data =  gameSpeakAndDrawRepository.findBySpeekNo(randomNo);
            GameAnswer answer = new GameAnswer(data.getAnswer());
            return answer;
        }else if(gameType == 3){
            ObjectFast data = gameObjectFastRepository.findByObjectNo(randomNo);
            GameAnswer answer = new GameAnswer(data.getImageUrl());
            return answer;
        }
        return new GameAnswer("존재하지 않는 게임입니다.");
    }

    @Override
    public GameAnswerAndImageRes answerAndImage(int gameType) {
        PersonQuiz data = gamePersonQuizRepository.findByPersonNO(randomNo);
        GameAnswerAndImageRes answer = new GameAnswerAndImageRes(data.getPersonAnswer(), data.getImageUrl());
        return answer;
    }
}
