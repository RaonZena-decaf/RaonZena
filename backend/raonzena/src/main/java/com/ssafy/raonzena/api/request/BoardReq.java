package com.ssafy.raonzena.api.request;

import com.ssafy.raonzena.db.entity.Board;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BoardReq {

    private String boarImageUrl;

    private String content;

    private String title;

    private long userNo;

    private long firstUser;

    private long secondUser;

    private long thirdUser;

    //dto -> entity
    public Board toEntity(){
        return Board.builder()
                .boardImageUrl(boarImageUrl)
                .content(content)
                .title(title)
                .userNo(userNo)
                .firstUser(firstUser)
                .secondUser(secondUser)
                .thirdUser(thirdUser)
                .build();

    }
}
