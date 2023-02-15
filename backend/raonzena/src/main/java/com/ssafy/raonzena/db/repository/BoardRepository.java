package com.ssafy.raonzena.db.repository;

import com.ssafy.raonzena.db.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface BoardRepository extends JpaRepository<Board,Long> {


    //피드리스트
    List<Board> findByUserNoOOrderByCreateDtmDesc(long userNo);

    //피드 1개
    Board findByBoardNo(long feedNo);

    //피드 저장
    Board save(Board board);

}
