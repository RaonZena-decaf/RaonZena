package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.response.UserLoginRes;

public interface UserService {

    UserLoginRes KaKaoLogin(String authorizedCode);
}
