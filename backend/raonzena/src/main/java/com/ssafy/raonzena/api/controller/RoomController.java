package com.ssafy.raonzena.api.controller;

import com.ssafy.raonzena.api.request.RoomReq;
import com.ssafy.raonzena.api.service.RoomService;
import com.ssafy.raonzena.api.service.UserService;
import com.ssafy.raonzena.db.entity.RoomInfo;
import com.ssafy.raonzena.db.entity.User;
import com.ssafy.raonzena.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1/room")
@RestController
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private UserService userService;

    @PostMapping
    protected ResponseEntity<?> roomAdd(@RequestBody RoomReq roomReq){
        //////////세션정보로 유저넘버 얻어오기 구현 필요/////////
        User user = userService.selectUser(1);

        // 게임방 생성
        return ResponseEntity.ok(roomService.addRoom(roomReq, user));

    }
}
