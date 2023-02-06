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
import org.springframework.data.redis.core.RedisOperationsSessionRepository;


@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    private RedisOperationsSessionRepository sessionRepository;

    @GetMapping()
    public ResponseEntity<UserRes> checkCookie(HttpServletRequest request) {
        // 쿠키 만료시 Cookie 값이 null이 된다. (유효 시간 동안은 개발자 모드 진입 후(F12) 쿠키 보면 AUTH 라는 이름으로 세션 ID가 들어가 있음)
        Cookie auth = WebUtils.getCookie(request, "AUTH");
        System.out.println(auth);

        // 로그인 정보가 있을시
        if(!ObjectUtils.isEmpty(auth)){
            if(auth.getValue().equals(request.getSession().getId())){
                String userNo = (String) request.getSession().getAttribute("userNo");
                if(userNo != null){
                    System.out.println("성공");
                    return ResponseEntity.ok().build();
                }
            }
        }
        System.out.println("실패ㅠ");
        // 로그인 만료 or 비 로그인자 일시 -> 204 no content
        return ResponseEntity.noContent().build();
    }



    @PostMapping("/kakao/callback")
    public ResponseEntity<UserRes> kakaoLogin(@RequestBody String code, HttpServletResponse response, HttpSession session){
        System.out.println("------------------");
        System.out.println(code.getClass().getName());
//        System.out.println(code.substring(1,code.length()-1));
        System.out.println(code);
        //authorizeCode : 카카오 서버로부터 받은 인가 코드
//        return ResponseEntity.ok(userService.KaKaoLogin(code));
        UserRes userRes = userService.KaKaoLogin(code);

        // 세션 저장 (세션 ID, 사용자 정보)
        session.setAttribute("userNo", userRes.getUserNo());
        sessionRepository.save(session);

        // 쿠키 전달 (세션 ID)
        response.addCookie(new Cookie("AUTH", session.getId()){{
            setMaxAge(3600); // 자동 로그인 1시간 유지
            setPath("/"); // 아래 경로에서 쿠키값 유지
        }});

        return new ResponseEntity<>(userRes, HttpStatus.OK);
    }

}
