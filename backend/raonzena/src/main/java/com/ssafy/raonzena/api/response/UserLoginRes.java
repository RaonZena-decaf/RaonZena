package com.ssafy.raonzena.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserLoginRes {
    private int user_no;
    private String user_id;
    private String user_name;
    private int exp;
    private int level;
    private String user_image;

    @Builder
    public UserLoginRes(int user_no, String user_id, String user_name, int exp, int level, String user_image) {
        this.user_no = user_no;
        this.user_id = user_id;
        this.user_name = user_name;
        this.exp = exp;
        this.level = level;
        this.user_image = user_image;
    }
}
