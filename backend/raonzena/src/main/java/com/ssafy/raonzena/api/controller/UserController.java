package com.ssafy.raonzena.api.controller;


import com.ssafy.raonzena.api.response.UserRes;
import com.ssafy.raonzena.api.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    UserService userService;


    @PostMapping("/kakao/callback")
    public ResponseEntity<UserRes> kakaoLogin(@RequestBody String code){
        System.out.println("------------------");
        System.out.println(code.getClass().getName());
//        System.out.println(code.substring(1,code.length()-1));
        System.out.println(code);
        //authorizeCode : 카카오 서버로부터 받은 인가 코드
        return ResponseEntity.ok(userService.KaKaoLogin(code));
    }



}
