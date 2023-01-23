package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.request.RoomReq;
import com.ssafy.raonzena.api.response.LiveRoomInfoRes;
import com.ssafy.raonzena.db.entity.User;
import com.ssafy.raonzena.db.repository.LiveRepositorySupport;
import com.ssafy.raonzena.db.repository.RoomRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *	게임방 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service
@Transactional
public class RoomServiceImpl implements RoomService{

    @Autowired
    RoomRepositorySupport roomRepositorySupport;

    @Override
    public LiveRoomInfoRes addRoom(RoomReq roomReq, User sessionUser) {
        // 게임방 생성
        return roomRepositorySupport.insertRoom(roomReq,sessionUser);
    }
}
