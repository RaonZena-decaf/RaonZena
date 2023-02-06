package com.ssafy.raonzena.api.controller;

import com.ssafy.raonzena.api.request.RoomReq;
import com.ssafy.raonzena.api.response.LiveRoomInfoRes;
import com.ssafy.raonzena.api.service.LiveService;
import com.ssafy.raonzena.api.service.RoomService;
import com.ssafy.raonzena.api.service.UserService;
import com.ssafy.raonzena.db.entity.User;
import io.openvidu.java.client.OpenVidu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RequestMapping("/api/v1/live")
@RestController
public class LiveController {

    @Autowired
    private LiveService liveService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private UserService userService;

    //openvidu_url
    @Value("https://i8a507.p.ssafy.io:8443")  //https://i8a507.p.ssafy.io:3478
    private String OPENVIDU_URL;

    //시크릿 키
    @Value("RAONZENA")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    //방 관리
    // Collection to pair session names and OpenVidu Session objects
    private Map<Long, Integer> mapSessions = new ConcurrentHashMap<>(); //Map<roomId,참가자수>

    @PostMapping("/room")
    protected ResponseEntity<?> roomAdd(@RequestBody RoomReq roomReq){
        //////////세션정보로 유저넘버 얻어오기 구현 필요/////////
        User user = userService.selectUser(2);

        //1.room 정보 db에 저장
        LiveRoomInfoRes liveRoomInfoRes = roomService.addRoom(roomReq, user);


        //방 map에 저장 (roomId 와 참가자수 1명)
        this.mapSessions.put(liveRoomInfoRes.getRoomNo(),1);


        // 게임방 생성
        return ResponseEntity.ok(liveRoomInfoRes);


    }
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
