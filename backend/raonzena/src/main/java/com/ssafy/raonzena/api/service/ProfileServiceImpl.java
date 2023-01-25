package com.ssafy.raonzena.api.service;


import com.ssafy.raonzena.api.response.BoardRes;
import com.ssafy.raonzena.api.response.FollowFollowingtRes;
import com.ssafy.raonzena.api.response.UserProfileRes;
import com.ssafy.raonzena.api.response.UserRes;
import com.ssafy.raonzena.db.entity.Board;
import com.ssafy.raonzena.db.entity.User;
import com.ssafy.raonzena.db.repository.BoardRepository;
import com.ssafy.raonzena.db.repository.ProfileRepositorySupport;
import com.ssafy.raonzena.db.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 유저 프로필 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Slf4j
@Service
@Transactional(readOnly = true)
public class ProfileServiceImpl implements ProfileService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    ProfileRepositorySupport profileRepositorySupport;

    @Autowired
    BoardRepository boardRepository;

    @Override
    public List<FollowFollowingtRes> follower(long userNo) { //userNo를 팔로우 한 사람
        return profileRepositorySupport.findFollowerByUserNo(userNo);
    }

    @Override
    public List<FollowFollowingtRes> following(long userNo) { //userNo가 팔로우 한사람
        return profileRepositorySupport.findFolloweeByUserNo(userNo);
    }

    @Override
    public UserRes userInfo(long userNo) {
        User profile = userRepository.findByUserNo(userNo);

        return new UserRes(profile);
    }

    @Override
    public List<UserProfileRes> findProfiles(Map<String, Object> conditions) {
        // 유저 프로필 조회
        return profileRepositorySupport.selectProfiles(conditions);
    }

    @Override
    public List<BoardRes> feedList(long userNo) {
        List<Board> feed = boardRepository.findByUserNo(userNo);

        return feed.stream().map(m -> new BoardRes(m.getBoardNo(), m.getBoardImage(), m.getContent(), m.getUserNo(), m.getCreateDate(), m.getFirstUser(), m.getSecondUser(), m.getThirdUser())).collect(Collectors.toList());
    }

}
