package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.response.FollowFollowingtRes;

import java.util.List;

public interface ProfileService {

    //팔로워 리스트
    List<FollowFollowingtRes> follower(int userNo);

    //팔로잉 리스트
    List<FollowFollowingtRes> following(int userNo);

}
