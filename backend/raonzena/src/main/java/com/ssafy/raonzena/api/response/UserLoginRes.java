package com.ssafy.raonzena.api.response;

import com.ssafy.raonzena.db.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Getter
@NoArgsConstructor
public class UserLoginRes {
    private int userNo;
    private String userId;
    private String userName;
    private int exp;
    private int level;
    private String userImage;

    //entity -> dto
    @Builder
    public UserLoginRes(User user) {
//        this.userNo = user.getUserNo();
//        this.userId = user.getUserId();
//        this.userName = user.getUserName();
//        this.exp = user.getExp();
//        this.level = user.getLevel();
//        this.userImage = user.getUserImage();

        //위에 코드 아래로 변경
        BeanUtils.copyProperties(user, this);
    }
}
