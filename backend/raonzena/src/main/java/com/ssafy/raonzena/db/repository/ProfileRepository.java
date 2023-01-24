package com.ssafy.raonzena.db.repository;

<<<<<<< backend/raonzena/src/main/java/com/ssafy/raonzena/db/repository/ProfileRepository.java
import com.ssafy.raonzena.api.response.UserRes;
import com.ssafy.raonzena.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfileRepository extends JpaRepository<User,Long> {

    User findByUserNo (int userNo);


// import com.ssafy.raonzena.api.response.LiveRoomInfoRes;
// import com.ssafy.raonzena.api.response.UserProfileRes;

// import java.util.List;
// import java.util.Map;

// /**
//  * 유저 프로필 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
//  */
// public interface ProfileRepository {

//     // 유저 프로필 조회
//     List<UserProfileRes> selectProfiles(Map<String, Object> conditions);

}
