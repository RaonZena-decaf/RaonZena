package com.ssafy.raonzena.api.request;

import com.ssafy.raonzena.db.entity.User;
import lombok.*;

@Data
@NoArgsConstructor
public class UserLoginReq {
    private long userNo;
    private String userId;
    private String userName;
    private String userImageUrl;


    //dto -> entity
    public User toEntity(){
        return User.builder()
                .userNo(userNo)
                .userId(userId)
                .userName(userName)
                .userImageUrl(userImageUrl)
                .build();

    }
}
