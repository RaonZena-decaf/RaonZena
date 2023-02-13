package com.ssafy.raonzena.api.controller;


import com.ssafy.raonzena.api.request.ExpReq;
import com.ssafy.raonzena.api.request.FollowReq;
import com.ssafy.raonzena.api.request.RoomReq;
import com.ssafy.raonzena.api.response.BoardRes;
import com.ssafy.raonzena.api.response.FollowFollowingtRes;
import com.ssafy.raonzena.api.response.UserProfileRes;
import com.ssafy.raonzena.api.response.UserRes;
import com.ssafy.raonzena.api.service.ProfileService;
import com.ssafy.raonzena.api.service.UserService;
import com.ssafy.raonzena.db.entity.Board;
import com.ssafy.raonzena.db.entity.Follow;
import com.ssafy.raonzena.db.entity.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {

    private final Logger logger = LogManager.getLogger(ProfileController.class);

    @Autowired
    ProfileService profileService;

    @Autowired
    UserService userService;

    @PostMapping
    protected ResponseEntity<?> follow(@RequestBody FollowReq followReq, HttpSession session){
        logger.info("팔로우 하기");

        //session에서 userNo 받음
        long userNo = Long.parseLong(session.getAttribute("userNo").toString());
        User user = userService.selectUser(userNo);

        // 팔로우 성공시 ok 반환
        if(profileService.follow(followReq.getFollowNo(), user.getUserNo())){
            return ResponseEntity.ok("Success");
        } else {
            // 팔로우 실패 시 Failure 반환
            return ResponseEntity.ok("Failure");
        }
    }

    @GetMapping("{userNo}/follower")
    public ResponseEntity<List<FollowFollowingtRes>> follower(@PathVariable long userNo){
        logger.info("userNo를 팔로우 하는 사람들");

        return ResponseEntity.ok(profileService.follower(userNo));
    }

    @GetMapping("{userNo}/following")
    public ResponseEntity<List<FollowFollowingtRes>> following(@PathVariable long userNo){
        logger.info("userNo가 팔로우 하는 사람들");

        return ResponseEntity.ok(profileService.following(userNo));
    }

    @GetMapping("{userNo}")
    public ResponseEntity<UserRes> userProfile(@PathVariable long userNo){
        logger.info("유저 프로필 정보");

        return ResponseEntity.ok(profileService.userInfo(userNo));
    }

    @GetMapping
    protected ResponseEntity<List<UserProfileRes>> profilesList(@RequestParam(required = false) String keyword){
        logger.info("유저 프로필 조회");

        Map<String, Object> conditions = new HashMap<String, Object>();
        if (keyword != null) {
            // 아이디 검색 키워드가 존재하면 keyword map에 저장
            conditions.put("keyword", keyword);
        }

        return ResponseEntity.ok(profileService.findProfiles(conditions));
    }

    @GetMapping("{userNo}/feedList")
    public ResponseEntity<List<BoardRes>> feedList(@PathVariable long userNo){
        logger.info("유저 프로필 피드 리스트");

        return ResponseEntity.ok(profileService.feedList(userNo));
    }

    @GetMapping("/feed/{feedNo}")
    public ResponseEntity<BoardRes> feedDetail(@PathVariable long feedNo){
        logger.info("피드 디테일 정보");

        return ResponseEntity.ok(profileService.feedDetail(feedNo));
    }

    @GetMapping("/{userNo}/followerCnt")
    public ResponseEntity<Integer> followerCnt(@PathVariable long userNo){
        logger.info("팔로워 수");

        return ResponseEntity.ok(profileService.followerCnt(userNo));
    }

    @GetMapping("/{userNo}/followingCnt")
    public ResponseEntity<Integer> followingCnt(@PathVariable long userNo){
        logger.info("팔로잉 수");

        return ResponseEntity.ok(profileService.followingCnt(userNo));
    }

    @GetMapping("/{followNo}/status")
    public ResponseEntity<?> followStatus(@PathVariable long followNo, HttpSession session){
        logger.info("팔로우 상태 확인");

        long userNo = Long.parseLong(session.getAttribute("userNo").toString());

        if(profileService.isFollowed(userNo,followNo)!=null){
            // 팔로우가 되어있을 경우
            return ResponseEntity.ok("isFollowed");
        }else{
            // 팔로우가 안되어있을 경우
            return ResponseEntity.ok("isNotFollowed");
        }
    }

    @PutMapping("/expToLevelModify")
    public ResponseEntity<?> expToLevelModify(@RequestBody ExpReq expReq){
        logger.info("경험치와 레벨 갱신");

        profileService.expToLevelModify(expReq);

        return ResponseEntity.ok("Success");
    }

    @DeleteMapping("/feedDelete/{boardNo}")
    public ResponseEntity<?> feedDelete(@PathVariable long boardNo){
        logger.info("피드 삭제하기");

        profileService.feedDelete(boardNo);

        return ResponseEntity.ok("Success");
    }

    @DeleteMapping("{followNo}")
    protected ResponseEntity<?> unfollow(@PathVariable long followNo, HttpSession session) {
        logger.info("언팔로우하기");

        //session에서 userNo 받음
        long userNo = Long.parseLong(session.getAttribute("userNo").toString());
        User user = userService.selectUser(userNo);

        // 언팔로우 성공시 ok 반환
        if (profileService.unfollow(followNo, user.getUserNo())) {
            return ResponseEntity.ok("Success");
        } else {
            // 언팔로우 실패 시 Failure 반환
            return ResponseEntity.ok("Failure");
        }
    }

}
