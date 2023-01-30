package com.ssafy.raonzena.db.repository;


import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.raonzena.api.response.BoardRes;
import com.ssafy.raonzena.api.response.FollowFollowingtRes;
import com.ssafy.raonzena.api.response.UserProfileRes;
import com.ssafy.raonzena.db.entity.Board;
import com.ssafy.raonzena.db.entity.QBoard;
import com.ssafy.raonzena.db.entity.QFollow;
import com.ssafy.raonzena.db.entity.QUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

import static com.ssafy.raonzena.db.entity.QUser.user;
import static com.ssafy.raonzena.db.entity.QFollow.follow;
import static com.ssafy.raonzena.db.entity.QBoard.board;


/**
 * 유저 프로필 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class ProfileRepositorySupport { //implements ProfileRepository

    // private final JPAQueryFactory query;
    // public ProfileRepositorySupport(JPAQueryFactory query) {
    //     this.query = query;
    // }

    @Autowired
    private JPAQueryFactory query;


    //userNo를 팔로우 하는 사람들
    public List<FollowFollowingtRes> findFollowerByUserNo (long userNo){
        return query
                .select(Projections.fields(FollowFollowingtRes.class,
                        user.userNo, user.userName))
                .from(user)
                .where(user.userNo.in (
                        JPAExpressions
                                .select(follow.follower)
                                .from(follow)
                                .where(follow.followee.eq(userNo))
                )).fetch();
    }
    //userNo가 팔로우 하는 사람들
    public List<FollowFollowingtRes> findFolloweeByUserNo (long userNo){
        return query
                .select(Projections.fields(FollowFollowingtRes.class,
                        user.userNo, user.userName))
                .from(user)
                .where(user.userNo.in (
                        JPAExpressions
                                .select(follow.followee)
                                .from(follow)
                                .where(follow.follower.eq(userNo))
                )).fetch();
    }

//    @Override
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
            return user.userId.like(keyword+"%");
        }
        return null;
    }



}
