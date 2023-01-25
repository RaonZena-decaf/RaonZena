package com.ssafy.raonzena.api.response;

import lombok.AllArgsConstructor;
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



}
