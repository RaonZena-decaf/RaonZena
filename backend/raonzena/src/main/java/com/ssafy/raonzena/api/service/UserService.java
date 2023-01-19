package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.db.entity.User;

public interface UserService {

    User KaKaoLogin(String authorizedCode);
}
