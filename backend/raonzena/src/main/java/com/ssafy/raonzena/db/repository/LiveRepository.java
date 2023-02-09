package com.ssafy.raonzena.db.repository;

import com.ssafy.raonzena.api.response.LiveRoomInfoRes;
import com.ssafy.raonzena.db.entity.Follow;
import com.ssafy.raonzena.db.entity.PersonQuiz;
import com.ssafy.raonzena.db.entity.RoomInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Map;

/**
 * 실행중인 게임방 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
public interface LiveRepository extends JpaRepository<RoomInfo, Long> {

    RoomInfo findByRoomNo(long roomNo);
}
