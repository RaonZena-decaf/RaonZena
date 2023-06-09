package com.ssafy.raonzena.api.controller;


import com.ssafy.raonzena.api.response.UserRes;
import com.ssafy.raonzena.api.service.UserService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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

    private final Logger logger = LogManager.getLogger(UserController.class);

    @Autowired
    UserService userService;

    @PostMapping("/kakao/callback")
    public ResponseEntity<UserRes> kakaoLogin(@RequestBody String code, HttpSession session){
        logger.info("카카오 로그인");

        //code : 카카오 서버로부터 받은 인가 코드
        UserRes userRes = userService.KaKaoLogin(code);

        // 세션 저장 (세션 ID, 사용자 정보)
        session.setAttribute("userNo", userRes.getUserNo());

        return ResponseEntity.ok(userRes);
    }

    @GetMapping("/logout")
    public void logout(HttpSession session){
        logger.info("로그아웃");
        logger.info(session.getAttribute("userNo")+"삭제");

        userService.logout(Long.parseLong(session.getAttribute("userNo").toString()));

        // 세션에 해당 세션키에 대한 데이터 삭제
        session.removeAttribute("userNo");
    }

}
