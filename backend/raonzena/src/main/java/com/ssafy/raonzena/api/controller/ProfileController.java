package com.ssafy.raonzena.api.controller;


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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {
    @Autowired
    ProfileService profileService;

    @Autowired
    UserService userService;

    @PostMapping
    protected ResponseEntity<?> follow(@RequestBody FollowReq followReq){
        //////////세션정보로 유저넘버 얻어오기 구현 필요/////////
        User user = userService.selectUser(1);

        // 정상 팔로우 ok 반환
        if(profileService.follow(followReq.getFollowNo(), user.getUserNo())){ /////////세션정보 필요//////////
            return ResponseEntity.ok().build();
        } else {
            // 팔로우 실패 시 일단 500 에러 /////////////////////실패시 반환할 값 어떻게 할건지//////////
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("{userNo}/follower")  //userNo를 팔로우 하는 사람들
    public ResponseEntity<List<FollowFollowingtRes>> follower(@PathVariable long userNo){
        return ResponseEntity.ok(profileService.follower(userNo));
    }

    @GetMapping("{userNo}/following") //userNo가 팔로우 하는 사람들
    public ResponseEntity<List<FollowFollowingtRes>> following(@PathVariable long userNo){
        return ResponseEntity.ok(profileService.following(userNo));
    }

    @GetMapping("{userNo}")
    public ResponseEntity<UserRes> userProfile(@PathVariable long userNo){
        return ResponseEntity.ok(profileService.userInfo(userNo));
    }

    @GetMapping
    protected ResponseEntity<List<UserProfileRes>> profilesList(@RequestParam(required = false) String keyword){
        // 유저 프로필 조회
        Map<String, Object> conditions = new HashMap<String, Object>();
        if (keyword != null) {
            // 아이디 검색 키워드가 존재하면 keyword map에 저장
            conditions.put("keyword", keyword);
        }

        return ResponseEntity.ok(profileService.findProfiles(conditions));
    }

    @GetMapping("{userNo}/feedList") //피드리스트
    public ResponseEntity<List<BoardRes>> feedList(@PathVariable long userNo){
        return ResponseEntity.ok(profileService.feedList(userNo));
    }



}
