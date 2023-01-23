package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.response.LiveRoomInfoRes;
import com.ssafy.raonzena.api.response.UserLoginRes;
import com.ssafy.raonzena.db.entity.User;

import java.util.List;
import java.util.Map;

public interface UserService {

    UserLoginRes KaKaoLogin(String authorizedCode);

    // userNo로 유저 정보 조회
    User selectUser(int userNo);
}
