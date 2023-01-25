package com.ssafy.raonzena.db.repository;

import com.ssafy.raonzena.db.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {


}
