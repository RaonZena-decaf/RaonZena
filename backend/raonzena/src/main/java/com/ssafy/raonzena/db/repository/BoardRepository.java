package com.ssafy.raonzena.db.repository;

import com.ssafy.raonzena.db.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface BoardRepository extends JpaRepository<Board,Long> {

    List<Board> findByUserNo(long userNo);


}
