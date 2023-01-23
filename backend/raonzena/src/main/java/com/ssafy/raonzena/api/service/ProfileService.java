package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.response.UserProfileRes;

import java.util.List;
import java.util.Map;

/**
 *	유저 프로필 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface ProfileService {

    // 유저 프로필 조회
    List<UserProfileRes> findProfiles(Map<String, Object> conditions);
}
