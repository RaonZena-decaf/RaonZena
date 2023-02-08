package com.ssafy.raonzena.api.service;


import com.ssafy.raonzena.api.request.ExpReq;
import com.ssafy.raonzena.api.response.BoardRes;
import com.ssafy.raonzena.api.response.FollowFollowingtRes;
import com.ssafy.raonzena.api.response.UserProfileRes;
import com.ssafy.raonzena.api.response.UserRes;
import com.ssafy.raonzena.db.entity.Follow;

import java.util.List;
import java.util.Map;

/**
 *	유저 프로필 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */

public interface ProfileService {

    // 유저 팔로우 하기
    boolean follow(long followNo, long userNo); //////세션정보 필요/////

    //팔로워 리스트
    List<FollowFollowingtRes> follower(long userNo);

    //팔로잉 리스트
    List<FollowFollowingtRes> following(long userNo);

    //프로필 1개 조회
    UserRes userInfo(long userNo);

    // 유저 프로필 조회
    List<UserProfileRes> findProfiles(Map<String, Object> conditions);

    //피드 리스트
    List<BoardRes> feedList(long userNo);

    // 유저 언팔로우 하기
    boolean unfollow(long followNo, long userNo); //////세션정보 필요/////

    // 팔로우 여부 조회
    Follow isFollowed(long follower, long followee);

    //피드 디테일
    BoardRes feedDetail(long feedNo);

    int followerCnt(long userNo);

    int followingCnt(long userNo);

    void expToLevelModify(ExpReq expReq);
}
