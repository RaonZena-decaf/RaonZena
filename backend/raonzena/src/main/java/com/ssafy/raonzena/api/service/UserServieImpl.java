package com.ssafy.raonzena.api.service;


import com.ssafy.raonzena.api.controller.GameController;
import com.ssafy.raonzena.api.dto.KaKaoDto;
import com.ssafy.raonzena.api.request.UserLoginReq;
import com.ssafy.raonzena.api.response.UserRes;
import com.ssafy.raonzena.db.entity.User;
import com.ssafy.raonzena.db.repository.UserRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class UserServieImpl implements UserService{

    private final Logger logger = LogManager.getLogger(GameController.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Value("${kakao-admin-key}")
    private String kakao_admin_key;


    //카카오 토큰 가져오기
    public String getKaKaoAccessToken(String authorizedCode){
        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpBody 오브젝트 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakao_admin_key);//kakao rest-api 키
//        params.add("redirect_uri", "http://localhost:3000/oauth/kakao/callback");
        params.add("redirect_uri", "https://i8a507.p.ssafy.io/oauth/kakao/callback");  //redirect-url 나중에 서버 주소 받음 바꾸기 //  https://i8a507.p.ssafy.io/oauth   http://localhost:3000/oauth/kakao/callback
        params.add("code", authorizedCode);

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);

        // Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음.
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // JSON -> 액세스 토큰 파싱
        String tokenJson = response.getBody();
        JSONObject rjson = new JSONObject(tokenJson);
        String accessToken = rjson.getString("access_token");

        return accessToken;
    }
    //카카오 유저 정보 가져오기
    public KaKaoDto getKaKaoUser(String token){
        //카카오 유저 정보 가져오기
        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);

        // Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음.
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        JSONObject body = new JSONObject(response.getBody());
        String user_name = body.getJSONObject("properties").getString("nickname");
        String user_image = body.getJSONObject("properties").getString("profile_image");
        String user_id = body.getLong("id") + "";

        return new KaKaoDto(user_name,user_image,user_id);

    }

    // 카카오 로그인
    //내 디비에 있는지 확인 -> x -> 저장
    public UserRes KaKaoLogin(String authorizedCode){

        //토큰 가져오기
        String token = getKaKaoAccessToken(authorizedCode);

        //프로필 정보 가져오기
        KaKaoDto userInfo = getKaKaoUser(token);
        logger.info("유저 정보 불러옴");

        //DB에 중복된 kakao id가 있는지 확인
        boolean kakaoUser = userRepository.existsByUserId(userInfo.getUserId());

        if(!kakaoUser){
            UserLoginReq user = new UserLoginReq();
            user.setUserId(userInfo.getUserId());
            user.setUserName(userInfo.getUserName());
            user.setUserImageUrl(userInfo.getUserImageUrl());

            userRepository.save(user.toEntity());
        }

        User userProfile = userRepository.findByUserId(userInfo.getUserId());

        //로그인시 userNo redis에 저장
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        String key = "userNo"+userProfile.getUserNo();
        valueOperations.set(key, String.valueOf(userProfile.getUserNo()));

        return new UserRes(userProfile);

    }

    @Override
    public User selectUser(long userNo) {

        return userRepository.findByUserNo(userNo);
    }

    @Override
    public int level(long userNo) {
        User user = userRepository.findByUserNo(userNo);
        return user.getLevel();
    }

    @Override
    public void logout(long userNo) {
        //로그아웃시 userNo redis에서 삭제
        String key = "userNo"+userNo;
        redisTemplate.delete(key);
    }

}
