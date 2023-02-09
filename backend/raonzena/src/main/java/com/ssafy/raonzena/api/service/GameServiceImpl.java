package com.ssafy.raonzena.api.service;


import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.raonzena.api.request.BoardReq;
import com.ssafy.raonzena.api.request.GameScoreReq;
import com.ssafy.raonzena.api.response.*;
import com.ssafy.raonzena.db.entity.*;
import com.ssafy.raonzena.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

import java.util.*;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@Transactional
@RequiredArgsConstructor
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

    @Autowired
    GameChanceRepository gameChanceRepository;

    @Autowired
    GameThemeRepositorySupport gameThemeRepositorySupport;

    @Autowired
    UserService userService;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;
    //===============================================================
    //더미데이터 넣으면 아래 코드로 바꾸기! -> 더미데이터들 수 다 통일하기
//        static int min = 1;
//        static int max = 100;
//        static int randomNo = (int) ((Math.random() * (max - min)) + min);
    static int randomNo = 1;
    //===============================================================


    @Override
    public boolean saveFeed(MultipartFile multipartFile, BoardReq boardReq) {
        //============================
        //1. 사진 s3에 저장
        // [Step 1] 파일이 저장될 경로를 지정
        String folderName = "board-image"; //버킷하위에 생성할 폴더 이름 . 이미지 업로드 후 해당이미지는 버킷네임/feed/디렉토리에 생성
        String fileName = folderName + "/"+multipartFile.getOriginalFilename();


        // [Step 2] 업로드할 파일의 메타 데이저 등록
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize());
        objectMetadata.setContentType(multipartFile.getContentType());

        // [Step 3] AWS S3에 파일 업로드
        try (InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.BucketOwnerRead));
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
        }
        //s3에 저장된 사진 url
        String s3Url = amazonS3.getUrl(bucket, fileName).toString();
        System.out.println(s3Url);
        //===========================

        
        //2. s3에 저장된 url board에 저장
        boardReq.setBoarImageUrl(s3Url);
        System.out.println(boardReq.toString());
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

    @Override
    public List<ChanceRes> chanceGameData(List<Integer> randomNo) {
        List<ChanceRes> chances = new ArrayList<>();
        for(int i=0; i<randomNo.size(); i++){
            int data = randomNo.get(i);
            //entity to dto
            Chance chance = gameChanceRepository.findByChanceNo(data);
            chances.add(new ChanceRes(chance));
        }
        return chances;
    }


    @Override
    public List<ImageThemeRes> getFrame(long userNo) {
        int level = userService.level(userNo);
        return gameThemeRepositorySupport.getThemes(level);
    }

    @Override
    public void saveGameScore(GameScoreReq gameScoreReq) {
        String key = "roomNo"+ gameScoreReq.getRoomNo();

        if (!redisTemplate.opsForHash().entries(key).isEmpty()){
            // 저장하기 전에 key값에 들어있는 정보 삭제
            Map<Object, Object> userData = redisTemplate.opsForHash().entries(key);
            for (Map.Entry<Object, Object> userD : userData.entrySet()) {
                redisTemplate.opsForHash().delete(key, userD.getKey());
            }
        }

        // 게임점수 redis에 저장
        for (int i=0; i<gameScoreReq.getUserData().size(); i++){
            List<Long> userGameData = gameScoreReq.getUserData().get(i);
            String userNo = userGameData.get(0).toString();
            String userScore = userGameData.get(1).toString();
            redisTemplate.opsForHash().put(key,userNo,userScore);
        }

        System.out.println(redisTemplate.opsForHash().entries(key));
    }

    @Override
    public GameScoreRes findGameScore(long roomNo) {
        String key = "roomNo"+ roomNo;
        Map<Object, Object> userData = redisTemplate.opsForHash().entries(key);

        // 전송할 user 점수 데이터
        List<List<Long>> userDataRes = new ArrayList<>();

        for (Map.Entry<Object, Object> userD : userData.entrySet()) {
            // 각 유저마다 점수 보내주기
            List<Long> userGameData = new ArrayList<>();
            userGameData.add(Long.valueOf(userD.getKey().toString()));
            userGameData.add(Long.valueOf(userD.getValue().toString()));
            userDataRes.add(userGameData);
        }

        System.out.println(userDataRes.toString());

        return new GameScoreRes(roomNo,userDataRes);
    }
}
