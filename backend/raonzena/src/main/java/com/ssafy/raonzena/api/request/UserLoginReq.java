package com.ssafy.raonzena.api.request;

import com.ssafy.raonzena.db.entity.User;
import lombok.*;

@Data
@NoArgsConstructor
public class UserLoginReq {
    private int userNo;
    private String userId;
    private String userName;
    private String userImage;


    //dto -> entity
    public User toEntity(){
        return User.builder()
                .userNo(userNo)
                .userId(userId)
                .userName(userName)
                .userImage(userImage)
                .build();

    }
}
