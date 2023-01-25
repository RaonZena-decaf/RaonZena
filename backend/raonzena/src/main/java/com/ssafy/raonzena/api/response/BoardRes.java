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

    private String boardImage;

    private String content;
    private int userNo;
    private Timestamp createDate;

    private int firstUser;

    private int secondUser;

    private int thirdUser;

    @Builder
    public BoardRes(Board board) {
        this.boardNo = board.getBoardNo();
        this.boardImage = board.getBoardImage();
        this.content = board.getContent();
        this.userNo = board.getUserNo();
        this.createDate = board.getCreateDate();
        this.firstUser = board.getFirstUser();
        this.secondUser = board.getSecondUser();
        this.thirdUser = board.getThirdUser();
    }
}
