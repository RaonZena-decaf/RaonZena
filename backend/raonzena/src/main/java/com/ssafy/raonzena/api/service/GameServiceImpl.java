package com.ssafy.raonzena.api.service;

import com.ssafy.raonzena.api.request.BoardReq;
import com.ssafy.raonzena.db.entity.Board;
import com.ssafy.raonzena.db.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class GameServiceImpl implements GameService{

    @Autowired
    BoardRepository boardRepository;


    @Override
    public boolean saveFeed(BoardReq boardReq) {

        Board check = boardRepository.save(boardReq.toEntity());
        return check != null ? true : false;
    }
}
