package com.ssafy.raonzena.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FollowingWithIsOnlieRes {

    private long userNo;
    private String userName;
    private String userImageUrl;
    private int level;
    private boolean isOnline;

}
