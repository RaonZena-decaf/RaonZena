package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.dto.KaKaoDto;
import com.ssafy.raonzena.api.request.UserLoginReq;
import com.ssafy.raonzena.db.entity.User;
import com.ssafy.raonzena.db.repository.UserRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class UserServieImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    //카카오 토큰 가져오기
    public String getKaKaoAccessToken(String authorizedCode){
        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpBody 오브젝트 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "c271efde78c62f250965bf71db6657fb");//kakao rest-api 키
        params.add("redirect_uri", "http://localhost:8080/user/kakao/callback");  //redirect-url 나중에 서버 주소 받음 바꾸기
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
        String email = body.getJSONObject("kakao_account").getString("email")+"_KAKAO";
        //String user_id = email.substring(0,email.indexOf("@"));

        return new KaKaoDto(user_name,user_image,email);

    }

    // 카카오 로그인
    //내 디비에 있는지 확인 -> x -> 저장
    //정보를 컨트롤러로 user 보내줘
    public User KaKaoLogin(String authorizedCode){
        //토큰 가져오기
        String token = getKaKaoAccessToken(authorizedCode);
        //프로필 정보 가져오기
        KaKaoDto userInfo = getKaKaoUser(token);

        //DB에 중복된 kakao id가 있는지 확인
        boolean kakaoUser = userRepository.existsByUserId(userInfo.getUser_id());

        if(!kakaoUser){
            UserLoginReq user = new UserLoginReq();
            user.setUser_id(userInfo.getUser_id());
            user.setUser_name(userInfo.getUser_name());
            user.setUser_image(userInfo.getUser_image());


            userRepository.save(user.toEntity());
        }


        return userRepository.findByUserId(userInfo.getUser_id()).get();



    }


}
