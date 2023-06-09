package com.ssafy.raonzena.db.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.raonzena.api.response.LiveRoomInfoRes;
import com.ssafy.raonzena.db.entity.QRoomInfo;
import com.ssafy.raonzena.db.entity.RoomInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

import static com.ssafy.raonzena.db.entity.QRoomInfo.roomInfo; //q타입 클래스 직접 import 해서 사용
import static com.ssafy.raonzena.db.entity.QFollow.follow; //q타입 클래스 직접 import 해서 사용
import static com.ssafy.raonzena.db.entity.QUser.user;

/**
 * 실행중인 게임방 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository //스프링 빈으로 등록
public class LiveRepositorySupport  {

    @Autowired
    private JPAQueryFactory query;

    public String password(long roomNo){
        //패스워드 확인
        return query.
                select(roomInfo.password)
                .from(roomInfo)
                .where(roomInfo.roomNo.eq(roomNo))
                .fetchOne();
    }

    public List<RoomInfo> selectRooms(Map<String, Object> conditions){
        // 현재 실행중인 방 키워드와 함께 조회
        return query
                .select(Projections.fields(RoomInfo.class,
                        roomInfo.roomNo,
                        roomInfo.roomTitle,
                        roomInfo.host,
                        roomInfo.headcount,
                        roomInfo.password,
                        roomInfo.createDtm,
                        roomInfo.imageName)
                ).from(roomInfo)
                .where(containKeyword(conditions))
                .orderBy(roomInfo.roomNo.desc())
                .fetch();
    }

    public List<RoomInfo> selectFollowingRooms(long userNo) {
        // 팔로잉 유저들이 호스트로 있는 방 조회
        return query
                .select(Projections.fields(RoomInfo.class,
                                roomInfo.roomNo,
                                roomInfo.roomTitle,
                                roomInfo.host,
                                roomInfo.headcount,
                                roomInfo.password,
                                roomInfo.createDtm,
                                roomInfo.imageName)
                ).from(roomInfo)
                 .join(follow)
                 .on(roomInfo.host.userNo.eq(follow.followee))
                 .where(follow.follower.eq(userNo))
                 .orderBy(roomInfo.roomNo.desc())
                 .fetch();
    }

    public boolean isAccessible(long roomNo, int headCount) {
        // 현재 게임에 참여하고 있는 인원 수 조회 후 게임에 참여할 수 있는지 반환

        // 설정된 게임방 최대 인원 수
        int limitHeadCount = query
                .select(roomInfo.headcount)
                .from(roomInfo)
                .where(roomInfo.roomNo.eq(roomNo))
                .fetchOne();

        // 유저가 게임에 참가할 수 있으면 true
        if(headCount + 1 <= limitHeadCount ) return true;

        // 유저가 게임에 참가할 수 없으면 false
        return false;
    }

    private BooleanExpression containKeyword(Map<String, Object> conditions){

        if(!conditions.isEmpty()) {
            // keyword가 존재할 때
            String keyword = (String) conditions.get("keyword");
            return roomInfo.roomTitle.contains(keyword);
        }
        return null;
    }
}
