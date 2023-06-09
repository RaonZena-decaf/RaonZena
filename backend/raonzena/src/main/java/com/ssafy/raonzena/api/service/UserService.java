package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.response.UserRes;
import com.ssafy.raonzena.db.entity.User;

public interface UserService {

    UserRes KaKaoLogin(String authorizedCode);

    // userNo로 유저 정보 조회
    User selectUser(long userNo);

    //user level
    int level(long userNo);

    // userNo 로그아웃
    void logout(long userNo);
}
