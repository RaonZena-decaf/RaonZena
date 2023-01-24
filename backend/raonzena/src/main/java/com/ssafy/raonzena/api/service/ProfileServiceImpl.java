package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.response.FollowFollowingtRes;
import com.ssafy.raonzena.db.repository.ProfileRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileServiceImpl implements ProfileService{
    @Autowired
    ProfileRepositorySupport profileRepositorySupport;

    @Override
    public List<FollowFollowingtRes> follower(int userNo) { //userNo를 팔로우 한 사람
        return profileRepositorySupport.findFollowerByUserNo(userNo);
    }

    @Override
    public List<FollowFollowingtRes> following(int userNo) { //userNo가 팔로우 한사람
        return profileRepositorySupport.findFolloweeByUserNo(userNo);
    }
}
