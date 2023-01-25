package com.ssafy.raonzena.api.service;


import com.ssafy.raonzena.api.response.BoardRes;
import com.ssafy.raonzena.api.response.FollowFollowingtRes;
import com.ssafy.raonzena.api.response.UserProfileRes;
import com.ssafy.raonzena.api.response.UserRes;

import java.util.List;
import java.util.Map;

/**
 *	유저 프로필 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */

public interface ProfileService {

    //팔로워 리스트
    List<FollowFollowingtRes> follower(int userNo);

    //팔로잉 리스트
    List<FollowFollowingtRes> following(int userNo);

    //프로필 1개 조회
    UserRes userInfo(int userNo);

    // 유저 프로필 조회
    List<UserProfileRes> findProfiles(Map<String, Object> conditions);

    //피드 리스트
    List<BoardRes> feedList(int userNo);

    //피드 디테일
    BoardRes feedDetail(long feedNo);
}
