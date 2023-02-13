package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.request.PasswordReq;
import com.ssafy.raonzena.api.response.LiveRoomInfoRes;

import java.util.List;
import java.util.Map;

/**
 *	실행중인 게임방 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface LiveService {
    //비밀번호 체크
    String passwordCheck(PasswordReq passwordReq);
    // 현재 실행중인 방 조회
    List<LiveRoomInfoRes> findRooms(Map<String, Object> conditions);
    // 팔로잉 유저들의 방 조회
    List<LiveRoomInfoRes> findFollowingRooms(long UserNo);
    // 유저 게임 참가 가능 여부 조회
    boolean isAccessible(long roomNo, int headCount);
    // 팔로우 onoffline 확인
    boolean onoff(long followNo);
    // 방 삭제
    boolean removeRoom(long roomNo);
}
