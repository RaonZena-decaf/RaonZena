package com.ssafy.raonzena.db.repository;

import com.ssafy.raonzena.db.entity.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public class UserRepositorySupport { //implements userRepository

    @PersistenceContext
    private EntityManager em;

    public User selectUser(int userNo){
        // userNo로 유저 정보 조회
        return em.find(User.class, userNo);
    }
}
