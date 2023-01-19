package com.ssafy.raonzena.api.request;

import com.ssafy.raonzena.db.entity.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class UserLoginReq {
    private int user_no;
    private String user_id;
    private String user_name;
    private int exp;
    private int level;
    private String user_image;



    public User toEntity(){
        return User.builder()
                .userNo(user_no)
                .userId(user_id)
                .userName(user_name)
                .exp(exp)
                .level(level)
                .userImage(user_image)
                .build();

    }
}
