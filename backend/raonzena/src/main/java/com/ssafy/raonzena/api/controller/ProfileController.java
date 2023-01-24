package com.ssafy.raonzena.api.controller;

import com.ssafy.raonzena.api.response.FollowFollowingtRes;
import com.ssafy.raonzena.api.service.ProfileService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

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



}
