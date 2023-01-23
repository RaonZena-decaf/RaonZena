package com.ssafy.raonzena.db.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.raonzena.api.response.UserProfileRes;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

import static com.ssafy.raonzena.db.entity.QUser.user;

/**
 * 유저 프로필 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class ProfileRepositorySupport implements ProfileRepository{

    private final JPAQueryFactory query;
    public ProfileRepositorySupport(JPAQueryFactory query) {
        this.query = query;
    }

    @Override
    public List<UserProfileRes> selectProfiles(Map<String, Object> conditions) {
        // 유저 아이디 키워드와 함께 조회
        return query
                .select(Projections.fields(UserProfileRes.class,
                        user.userNo,
                        user.userId,
                        user.userName,
                        user.exp,
                        user.level,
                        user.createDate,
                        user.userImage)
                ).from(user)
                .where(eqKeyword(conditions))
                .fetch();
    }

    private BooleanExpression eqKeyword(Map<String, Object> conditions){

        if(!conditions.isEmpty()) {
            // keyword가 존재할 때
            String keyword = (String) conditions.get("keyword");
            System.out.println(keyword);
            return user.userId.eq(keyword);
        }
        return null;
    }
}
