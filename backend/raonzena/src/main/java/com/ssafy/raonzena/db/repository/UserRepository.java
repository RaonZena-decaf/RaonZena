package com.ssafy.raonzena.db.repository;

import com.ssafy.raonzena.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    //id가 있는지 조회
    boolean existsByUserId(String user_id);

    //id로 회원 정보 가져오기
    Optional<User> findByUserId(String user_id);
}