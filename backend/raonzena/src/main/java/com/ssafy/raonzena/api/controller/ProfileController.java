package com.ssafy.raonzena.api.controller;


import com.ssafy.raonzena.api.response.BoardRes;
import com.ssafy.raonzena.api.response.FollowFollowingtRes;
import com.ssafy.raonzena.api.response.UserProfileRes;
import com.ssafy.raonzena.api.response.UserRes;
import com.ssafy.raonzena.api.service.ProfileService;
import com.ssafy.raonzena.db.entity.Board;
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

    @GetMapping("{userNo}/follower")  //userNo를 팔로우 하는 사람들
    public ResponseEntity<List<FollowFollowingtRes>> follower(@PathVariable int userNo){
        return ResponseEntity.ok(profileService.follower(userNo));
    }

    @GetMapping("{userNo}/following") //userNo가 팔로우 하는 사람들
    public ResponseEntity<List<FollowFollowingtRes>> following(@PathVariable int userNo){
        return ResponseEntity.ok(profileService.following(userNo));
    }

    @GetMapping("{userNo}")
    public ResponseEntity<UserRes> userProfile(@PathVariable int userNo){
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
    public ResponseEntity<List<BoardRes>> feedList(@PathVariable int userNo){
        return ResponseEntity.ok(profileService.feedList(userNo));
    }



}
