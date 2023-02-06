package com.ssafy.raonzena.api.response;

import com.ssafy.raonzena.db.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardRes {

    private long boardNo;

    private String boardImageUrl;

    private String content;

    private String title;
    private long userNo;
    private Timestamp createDtm;

    private long firstUser;

    private long secondUser;

    private long thirdUser;

    @Builder
    public BoardRes(Board board) {
        this.boardNo = board.getBoardNo();
        this.boardImageUrl = board.getBoardImageUrl();
        this.content = board.getContent();
        this.userNo = board.getUserNo();
        this.createDtm = board.getCreateDtm();
        this.firstUser = board.getFirstUser();
        this.secondUser = board.getSecondUser();
        this.thirdUser = board.getThirdUser();
    }
}
