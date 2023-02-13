package com.ssafy.raonzena.api.controller;

import com.ssafy.raonzena.api.request.PasswordReq;
import com.ssafy.raonzena.api.request.RoomReq;
import com.ssafy.raonzena.api.response.LiveRoomInfoRes;
import com.ssafy.raonzena.api.service.GameService;
import com.ssafy.raonzena.api.service.LiveService;
import com.ssafy.raonzena.api.service.RoomService;
import com.ssafy.raonzena.api.service.UserService;
import com.ssafy.raonzena.db.entity.User;
import io.openvidu.java.client.OpenVidu;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RequestMapping("/api/v1/live")
@RestController
public class LiveController {

    private final Logger logger = LogManager.getLogger(LiveController.class);

    @Autowired
    private LiveService liveService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private UserService userService;

    @Autowired
    private GameService gameService;

    @PostMapping("/room")
    protected ResponseEntity<?> roomAdd(@RequestBody RoomReq roomReq, HttpSession session){
        logger.info("방 생성");
        //session에서 userNo 받음
        long userNo = Long.parseLong(session.getAttribute("userNo").toString());
        User user = userService.selectUser(userNo);
        //room 정보 db에 저장
        LiveRoomInfoRes liveRoomInfoRes = roomService.addRoom(roomReq, user);

        return ResponseEntity.ok(liveRoomInfoRes);
    }
    @PostMapping("/passwordCheck")
    public ResponseEntity<?> passwordCheck(@RequestBody PasswordReq passwordReq){
        logger.info("방 비밀번호 확인");

        return ResponseEntity.ok(liveService.passwordCheck(passwordReq));
    }


    @GetMapping
    protected ResponseEntity<List<LiveRoomInfoRes>> liveRoomsList(@RequestParam(required = false) String keyword){
        logger.info("현재 실행중인 게임방 조회");
        Map<String, Object> conditions = new HashMap<String, Object>();
        if (keyword != null) {
            // 검색 키워가 존재하면 keyword map에 저장
            conditions.put("keyword", keyword);
        }

        return ResponseEntity.ok(liveService.findRooms(conditions));
    }

    @GetMapping("followingRoom")
    protected ResponseEntity<List<LiveRoomInfoRes>> followingRoomsList(HttpSession session){
        logger.info("팔로잉 유저들의 방 조회");
        //session에서 userNo 받음
        long userNo = Long.parseLong(session.getAttribute("userNo").toString());
        logger.info("userNo : "+userNo);
        return ResponseEntity.ok(liveService.findFollowingRooms(userNo));
    }

    @GetMapping("/{roomNo}")
    protected ResponseEntity<?> liveRoomAccess(@PathVariable long roomNo){
        logger.info("방 접속");

        // 방에 접속해 있는 인원수 조회
        int headCount = gameService.findActiveHeadCount(roomNo);

        // 게임 접속이 가능하면 ok 반환
        if(liveService.isAccessible(roomNo,headCount)){
            return ResponseEntity.ok("Success");
        } else {
            // 게임 접속 불가능하면 Unavailable 반환
            return ResponseEntity.ok("Unavailable");
        }
    }

    @GetMapping("/{followNo}/onoff")
    protected ResponseEntity<?> followingsOnOff(@PathVariable long followNo){
        logger.info("팔로워들 현재 상태 조회");

        if(liveService.onoff(followNo)){
            // online일 경우 online 반환
            return ResponseEntity.ok("online");
        }else{
            // offline일 경우 offline 반환
            return ResponseEntity.ok("offline");
        }
    }

    @DeleteMapping("/{roomNo}")
    protected ResponseEntity<?> roomRemove(@PathVariable long roomNo){
        logger.info("방 삭제");

        if(liveService.removeRoom(roomNo)){
            // 방 정상 삭제 시
            return ResponseEntity.ok("Success");
        }else{
            return ResponseEntity.ok("Failure");
        }
    }
}
