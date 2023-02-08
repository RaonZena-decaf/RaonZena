package com.ssafy.raonzena.api.service;


import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.raonzena.api.request.BoardReq;
import com.ssafy.raonzena.api.request.GameScoreReq;
import com.ssafy.raonzena.api.response.GameAnswer;
import com.ssafy.raonzena.api.response.GameAnswerAndImageRes;
import com.ssafy.raonzena.api.response.ImageThemeRes;
import com.ssafy.raonzena.db.entity.*;
import com.ssafy.raonzena.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

        String folderName = "board-image"; //버킷하위에 생성할 폴더 이름 . 이미지 업로드 후 해당이미지는 버킷네임/feed/디렉토리에 생성
        String fileName = folderName + "/"+multipartFile.getOriginalFilename();
        //파일 형식 구하기
        String ext = fileName.split("\\.")[1];
        String contentType = "";

        //content type을 지정해서 올려주지 않으면 자동으로 "application/octet-stream"으로 고정이 되서 링크 클릭시 웹에서 열리는게 아니라 자동 다운이 시작됨.
        switch (ext) {
            case "jpeg":
                contentType = "image/jpeg";
                break;
            case "png":
                contentType = "image/png";
                break;
        }
        System.out.println(multipartFile.getContentType());
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(multipartFile.getContentType());
            //s3에 저장
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, multipartFile.getInputStream(), metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        //s3에 저장된 사진 url
        String s3Url = amazonS3.getUrl(bucket, fileName).toString();

        //============================
        //2. s3에 저장된 url board에 저장
        boardReq.setBoarImageUrl(s3Url);
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
    public List<ImageThemeRes> getFrame(long userNo) {
        int level = userService.level(userNo);
        return gameThemeRepositorySupport.getThemes(level);
    }

    @Override
    public void saveGameScore(GameScoreReq gameScoreReq) {
        String key = "roomNo"+ gameScoreReq.getRoomNo();
        System.out.println(key);
        if (redisTemplate.opsForHash().entries(key)!= null){
            // 저장하기 전에 key값에 들어있는 정보 삭제
            redisTemplate.opsForHash().delete(key);
        }
        // 게임점수 redis에 저장
        for (int i=0; i<gameScoreReq.getUserData().size(); i++){
            List<Long> userGameData = gameScoreReq.getUserData().get(i);
            System.out.println(userGameData.toString());
            String userNo = userGameData.get(0).toString();
            int userScore = userGameData.get(1).intValue();
            System.out.println(userNo+" "+userScore);
            redisTemplate.opsForHash().put(key,userNo,userScore);
        }
        System.out.println(redisTemplate.opsForHash().entries(key));
    }
}
