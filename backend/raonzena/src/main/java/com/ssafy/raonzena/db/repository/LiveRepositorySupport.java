package com.ssafy.raonzena.db.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.raonzena.api.response.LiveRoomInfoRes;
import com.ssafy.raonzena.db.entity.QRoomInfo;
import com.ssafy.raonzena.db.entity.RoomInfo;
import com.ssafy.raonzena.db.entity.User;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

/**
 * 실행중인 게임방 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository //스프링 빈으로 등록
public class LiveRepositorySupport implements LiveRepository {

    private final JPAQueryFactory query;
    public LiveRepositorySupport(JPAQueryFactory query) {
        this.query = query;
    }

    QRoomInfo roomInfo = QRoomInfo.roomInfo;

    @Override
    public List<LiveRoomInfoRes> selectRooms(Map<String, Object> conditions){

        // 현재 실행중인 방 키워드와 함께 조회
        return query
                .select(Projections.fields(LiveRoomInfoRes.class,
                        roomInfo.roomNo,
                        roomInfo.roomTitle,
                        roomInfo.host,
                        roomInfo.headcount,
                        roomInfo.password,
                        roomInfo.createDate)
                )
                .from(roomInfo)
                .where(containKeyword(conditions))
                .fetch();
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
