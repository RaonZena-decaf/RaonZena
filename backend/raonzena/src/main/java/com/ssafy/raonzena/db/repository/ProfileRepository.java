package com.ssafy.raonzena.db.repository;

import com.ssafy.raonzena.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfileRepository extends JpaRepository<User,Long> {



}
