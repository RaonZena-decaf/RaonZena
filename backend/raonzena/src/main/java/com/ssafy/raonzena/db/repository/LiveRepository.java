package com.ssafy.raonzena.db.repository;

import com.ssafy.raonzena.api.response.LiveRoomInfoRes;
import com.ssafy.raonzena.db.entity.RoomInfo;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 실행중인 게임방 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */

public interface LiveRepository {
    // 현재 실행중인 방 조회
    List<LiveRoomInfoRes> selectRooms(Map<String, Object> conditions);
}
