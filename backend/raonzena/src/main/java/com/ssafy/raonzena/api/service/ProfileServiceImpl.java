package com.ssafy.raonzena.api.service;


import com.ssafy.raonzena.api.request.ExpReq;
import com.ssafy.raonzena.api.response.*;
import com.ssafy.raonzena.db.entity.Board;
import com.ssafy.raonzena.db.entity.Follow;
import com.ssafy.raonzena.db.entity.User;
import com.ssafy.raonzena.db.repository.BoardRepository;
import com.ssafy.raonzena.db.repository.FollowRepository;
import com.ssafy.raonzena.db.repository.ProfileRepositorySupport;
import com.ssafy.raonzena.db.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 유저 프로필 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Slf4j
@Service
@Transactional
public class ProfileServiceImpl implements ProfileService {
    @Autowired
    ProfileRepositorySupport profileRepositorySupport;
    @Autowired
    BoardRepository boardRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    FollowRepository followRepository;

    @Autowired
    LiveService liveService;

    @Autowired
    UserService userService;

    @Override
    public boolean follow(long followNo, long userNo) {
        // 유저 팔로우 하기
        Follow follow = new Follow();
        follow.setFollower(userNo);
        follow.setFollowee(followNo);
        Follow check = followRepository.saveAndFlush(follow);

        // 팔로우하기가 잘 됐으면 true 실패하면 false 반환
        return check!=null ? true: false;
    }

    @Override
    public List<FollowFollowingtRes> follower(long userNo) { //userNo를 팔로우 한 사람
        return profileRepositorySupport.findFollowerByUserNo(userNo);
    }

    @Override
    public List<FollowingWithIsOnlieRes> following(long userNo) { //userNo가 팔로우 한사람

        List<FollowingWithIsOnlieRes> followingWithIsOnlieList = new ArrayList<>();

        // followingList 받고 온라인 상태 넣기
        List<FollowFollowingtRes> followingList = profileRepositorySupport.findFolloweeByUserNo(userNo);
        for (FollowFollowingtRes following : followingList) {

            // 유저 온라인 상태
            boolean isOnline = liveService.onoff(following.getUserNo());
            followingWithIsOnlieList.add(new FollowingWithIsOnlieRes(following.getUserNo(), following.getUserName(), following.getUserImageUrl(), following.getLevel(),isOnline));
        }
        return followingWithIsOnlieList;
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

    //피드 리스트
    @Override
    public List<BoardRes> feedList(long userNo) {
        List<Board> feed = boardRepository.findByUserNoOrderByCreateDtmDesc(userNo);

        return feed.stream().map(m -> new BoardRes(m.getBoardNo(), m.getBoardImageUrl(), m.getContent(), m.getTitle(), m.getUserNo(), m.getCreateDtm(), m.getFirstUser(), m.getSecondUser(), m.getThirdUser())).collect(Collectors.toList());
    }

    @Override
    public boolean unfollow(long followNo, long userNo) {
        // 유저 언팔로우 하기
        Follow follow = isFollowed(userNo,followNo);
        if(follow!=null){
            // 팔로우가 되어 있을 경우
            followRepository.delete(follow);
            return true;
        } else {
            // 팔로우가 되어 있지 않을 경우
            return false;
        }
    }

    @Override
    public Follow isFollowed(long follower, long followee) {
        // 팔로우 여부 조회
        return followRepository.findByFollowerAndFollowee(follower, followee);
    }

    //피드 디테일
    @Override
    public BoardRes feedDetail(long feedNo) {
        Board board = boardRepository.findByBoardNo(feedNo);
        return new BoardRes(board);
    }

    //팔로워 수
    @Override
    public int followerCnt(long userNo) {

        return follower(userNo).size();
    }

    //팔로잉 수
    @Override
    public int followingCnt(long userNo) {

        return following(userNo).size();
    }

    //exp ,level update
    @Override
    public void expToLevelModify(ExpReq expReq) {
        //유저 정보 불러온다.
        User user = userService.selectUser(expReq.getUserNo());

        int exp = user.getExp();
        int level = user.getLevel();


        int changeExp = expReq.getExp() + exp; //바뀐 exp

        if(changeExp >= 200){  //유저의 exp 가 200이 넘어가면 level이 올라가고 exp-200을 exp에 업데이트 한다.
            level += 1;
            exp = changeExp - 200;
            userRepository.updateExpAndLevel(exp,level,expReq.getUserNo());
        }else{                 //200 안넘어가면 exp만 추가한다.
            exp = changeExp;
            userRepository.updateExp(exp,expReq.getUserNo());
        }

    }
    //피드 삭제
    @Override
    public void feedDelete(long boardNo) {

        profileRepositorySupport.feedDelete(boardNo);
    }

}
