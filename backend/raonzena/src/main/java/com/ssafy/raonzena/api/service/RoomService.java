package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.request.RoomReq;
import com.ssafy.raonzena.api.response.LiveRoomInfoRes;
import com.ssafy.raonzena.db.entity.User;

/**
 *	게임방 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface RoomService {

    // 게임방 생성
    LiveRoomInfoRes addRoom(RoomReq roomReq, User sessionUser);
}
