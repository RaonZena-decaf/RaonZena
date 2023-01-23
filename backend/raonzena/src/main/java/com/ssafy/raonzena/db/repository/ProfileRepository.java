package com.ssafy.raonzena.db.repository;

import com.ssafy.raonzena.api.response.LiveRoomInfoRes;
import com.ssafy.raonzena.api.response.UserProfileRes;

import java.util.List;
import java.util.Map;

/**
 * 유저 프로필 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
public interface ProfileRepository {

    // 유저 프로필 조회
    List<UserProfileRes> selectProfiles(Map<String, Object> conditions);
}
