package com.ssafy.raonzena.api.controller;


import com.ssafy.raonzena.api.response.UserRes;
import com.ssafy.raonzena.api.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping()
    public ResponseEntity<?> redisTest(HttpSession session) {
        session.setAttribute("userNo", 123456);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/kakao/callback")
    public ResponseEntity<UserRes> kakaoLogin(@RequestBody String code, HttpSession session){
        System.out.println("------------------");
        System.out.println(code.getClass().getName());
//        System.out.println(code.substring(1,code.length()-1));
        System.out.println(code);
        //authorizeCode : 카카오 서버로부터 받은 인가 코드
//        return ResponseEntity.ok(userService.KaKaoLogin(code));
        UserRes userRes = userService.KaKaoLogin(code);

        // 세션 저장 (세션 ID, 사용자 정보)
        session.setAttribute("userNo", userRes.getUserNo());

//        // 쿠키 전달 (세션 ID)
//        response.addCookie(new Cookie("AUTH", session.getId()){{
//            setMaxAge(3600); // 자동 로그인 1시간 유지
//            setPath("/"); // 아래 경로에서 쿠키값 유지
//        }});

        return ResponseEntity.ok(userRes);
    }

}
