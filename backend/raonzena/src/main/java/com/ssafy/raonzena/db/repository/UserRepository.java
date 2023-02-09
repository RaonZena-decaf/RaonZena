package com.ssafy.raonzena.db.repository;

import com.ssafy.raonzena.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    //id가 있는지 조회
    boolean existsByUserId(String user_id);

    //id로 회원 정보 가져오기
    User findByUserId(String user_id);

    // userNo로 유저 정보 조회
    User findByUserNo (long userNo);

    //exp 업데이트
    @Modifying(clearAutomatically = true)
    @Query("UPDATE User t SET t.exp = :exp WHERE t.userNo = :user_no")
    void updateExp(@Param(value="exp") int exp,@Param(value="user_no") long user_no);

    //exp와 레벨 업데이트
    @Modifying(clearAutomatically = true)
    @Query("UPDATE User t SET t.exp = :exp, t.level = :level WHERE t.userNo = :user_no")
    void updateExpAndLevel(@Param(value="exp") int exp, @Param(value="level") int level, @Param(value="user_no") long userNo);
}
