package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.response.FollowFollowingtRes;
import com.ssafy.raonzena.api.response.UserRes;
import com.ssafy.raonzena.db.entity.User;
import com.ssafy.raonzena.db.repository.ProfileRepository;
import com.ssafy.raonzena.db.repository.ProfileRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 *	유저 프로필 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Slf4j
@Service
@Transactional(readOnly = true)
public class ProfileServiceImpl implements ProfileService{
    @Autowired
    ProfileRepositorySupport profileRepositorySupport;

    @Autowired
    ProfileRepository profileRepository;

    @Override
    public List<FollowFollowingtRes> follower(int userNo) { //userNo를 팔로우 한 사람
        return profileRepositorySupport.findFollowerByUserNo(userNo);
    }

    @Override
    public List<FollowFollowingtRes> following(int userNo) { //userNo가 팔로우 한사람
        return profileRepositorySupport.findFolloweeByUserNo(userNo);
    }

    @Override
    public UserRes userInfo(int userNo) {
        User profile = profileRepository.findByUserNo(userNo);

        return new UserRes(profile);
    }

     @Override
    public List<UserProfileRes> findProfiles(Map<String, Object> conditions) {
        // 유저 프로필 조회
        return profileRepositorySupport.selectProfiles(conditions);
    }

}
