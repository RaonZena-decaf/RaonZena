package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.response.LiveRoomInfoRes;
import com.ssafy.raonzena.db.entity.RoomInfo;

import java.util.List;
import java.util.Map;

/**
 *	실행중인 게임방 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface LiveService {

    // 현재 실행중인 방 조회
    List<LiveRoomInfoRes> findRooms(Map<String, Object> conditions);
    // 팔로잉 유저들의 방 조회
    List<LiveRoomInfoRes> findFollowingRooms(int sessionUserNo); /////////세션정보 필요//////////
    // 유저 게임 참가 가능 여부 조회
    boolean isAccessible(int roomNo, int sessionHeadCount); /////////세션정보 필요//////////
}
