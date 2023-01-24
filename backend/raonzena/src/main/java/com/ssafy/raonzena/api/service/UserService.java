package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.response.UserRes;

public interface UserService {

    UserRes KaKaoLogin(String authorizedCode);
}
