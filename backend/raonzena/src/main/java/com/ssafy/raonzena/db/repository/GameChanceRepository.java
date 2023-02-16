package com.ssafy.raonzena.db.repository;

import com.ssafy.raonzena.db.entity.Chance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameChanceRepository extends JpaRepository<Chance,Long> {
    //인생역전 내용
    Chance findByChanceNo(long chanceNo);
}
