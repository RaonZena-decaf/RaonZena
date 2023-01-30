package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.response.LiveRoomInfoRes;
import com.ssafy.raonzena.db.entity.RoomInfo;
import com.ssafy.raonzena.db.repository.LiveRepositorySupport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Map;

/**
 *	실행중인 게임방 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Slf4j
@Service
@Transactional(readOnly = true)
public class LiveServiceImpl implements LiveService {

    @Autowired
    LiveRepositorySupport liveRepositorySupport;

    @Override
    public List<LiveRoomInfoRes> findRooms(Map<String, Object> conditions){
        // 현재 실행중인 방 조회
        return liveRepositorySupport.selectRooms(conditions);
    }

    @Override
    public List<LiveRoomInfoRes> findFollowingRooms(long sessionUserNo) { /////////세션정보 필요//////////
        // 팔로잉 유저들의 방 조회
        return liveRepositorySupport.selectFollowingRooms(sessionUserNo);
    }

    @Override
    public boolean isAccessible(long roomNo, int sessionHeadCount) { /////////세션정보 필요//////////
        // 유저 게임 참가 가능 여부 조회
        return liveRepositorySupport.isAccessible(roomNo,sessionHeadCount);
    }
}
