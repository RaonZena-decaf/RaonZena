package com.ssafy.raonzena.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class userGameInfo {
    private long userNo;

    private String userName;

    private String userImage;

    private int gameScore;

}
