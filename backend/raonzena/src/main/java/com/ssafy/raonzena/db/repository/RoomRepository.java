package com.ssafy.raonzena.db.repository;

import com.ssafy.raonzena.api.request.RoomReq;
import com.ssafy.raonzena.api.response.LiveRoomInfoRes;
import com.ssafy.raonzena.db.entity.RoomInfo;
import com.ssafy.raonzena.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 게임방 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
public interface RoomRepository extends JpaRepository<RoomInfo, Long> {



}
