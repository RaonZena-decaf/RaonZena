package com.ssafy.raonzena.db.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.raonzena.api.response.FollowFollowingtRes;
import com.ssafy.raonzena.api.response.LiveRoomInfoRes;
import com.ssafy.raonzena.api.response.UserRes;
import com.ssafy.raonzena.db.entity.QFollow;
import com.ssafy.raonzena.db.entity.QUser;
import com.ssafy.raonzena.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProfileRepositorySupport {
    @Autowired
    private JPAQueryFactory query;


    QUser user = QUser.user;
    QFollow follow = QFollow.follow;


    //userNo를 팔로우 하는 사람들
    public List<FollowFollowingtRes> findFollowerByUserNo (int userNo){
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
    public List<FollowFollowingtRes> findFolloweeByUserNo (int userNo){
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

}
