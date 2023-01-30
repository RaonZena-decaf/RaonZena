package com.ssafy.raonzena.api.controller;

import com.ssafy.raonzena.api.response.LiveRoomInfoRes;
import com.ssafy.raonzena.api.service.LiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/v1/live")
@RestController
public class LiveController {

    @Autowired
    private LiveService liveService;

    @GetMapping
    protected ResponseEntity<List<LiveRoomInfoRes>> liveRoomsList(@RequestParam(required = false) String keyword){
        // 현재 실행중인 게임방 조회
        Map<String, Object> conditions = new HashMap<String, Object>();
        if (keyword != null) {
            // 검색 키워가 존재하면 keyword map에 저장
            conditions.put("keyword", keyword);
        }

        return ResponseEntity.ok(liveService.findRooms(conditions));
    }

    @GetMapping("followingRoom")
    protected ResponseEntity<List<LiveRoomInfoRes>> followingRoomsList(){
        // 팔로잉 유저들의 방 조회
        return ResponseEntity.ok(liveService.findFollowingRooms(1)); /////////세션정보 필요//////////
    }

    @GetMapping("/{roomNo}")
    protected ResponseEntity<?> liveRoomAccess(@PathVariable long roomNo){
        // 게임 접속이 가능하면 ok 반환
        if(liveService.isAccessible(roomNo,2)){ /////////세션정보 필요//////////
            return ResponseEntity.ok().build();
        } else {
            // 게임 접속 불가능하면 일단 500 에러 /////////////////////실패시 반환할 값 어떻게 할건지//////////
            return ResponseEntity.internalServerError().build();
        }
    }
}
