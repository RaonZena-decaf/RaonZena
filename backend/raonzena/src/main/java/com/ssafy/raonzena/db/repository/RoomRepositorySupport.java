package com.ssafy.raonzena.db.repository;

import com.ssafy.raonzena.api.request.RoomReq;
import com.ssafy.raonzena.api.response.LiveRoomInfoRes;
import com.ssafy.raonzena.db.entity.RoomInfo;
import com.ssafy.raonzena.db.entity.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static com.ssafy.raonzena.db.entity.QRoomInfo.roomInfo;



/**
 * 게임방 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class RoomRepositorySupport implements RoomRepository{

    @PersistenceContext
    private EntityManager em;

    @Override
    public LiveRoomInfoRes insertRoom(RoomReq roomReq, User sessionUser) {////////////////세션정보에서 유저 가져오기 필요//////////
        // 게임방 생성
        System.out.println(roomReq);
        RoomInfo roomInfo = new RoomInfo();
        roomInfo.setRoomTitle(roomReq.getRoomTitle());
        roomInfo.setHeadcount(roomReq.getHeadcount());
        roomInfo.setPassword(roomReq.getPassword());
        roomInfo.setHost(sessionUser); //////세션정보에서 가져오기/////////
        em.persist(roomInfo);

        return new LiveRoomInfoRes(roomInfo.getRoomNo(), roomInfo.getRoomTitle(), roomInfo.getHost(), roomInfo.getHeadcount(), roomInfo.getPassword(),roomInfo.getCreateDtm());
    }
}
