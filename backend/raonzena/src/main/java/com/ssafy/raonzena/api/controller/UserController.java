package com.ssafy.raonzena.api.controller;


import com.ssafy.raonzena.api.response.UserRes;
import com.ssafy.raonzena.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    UserService userService;


    @GetMapping("/user/kakao/callback")
    public ResponseEntity<UserRes> kakaoLogin(String code){
        //authorizeCode : 카카오 서버로부터 받은 인가 코드
        return ResponseEntity.ok(userService.KaKaoLogin(code));
    }



}
