package com.ssafy.raonzena.api.response;

import com.ssafy.raonzena.db.entity.RoomInfo;
import com.ssafy.raonzena.db.entity.User;
import lombok.*;

import java.sql.Timestamp;

/**
 * 실행중인 게임방 조회 API ([GET] /api/v1/live?keyword=) 요청에 대한 응답값 정의.
 */

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LiveRoomInfoRes {

    private long roomNo;

    private String roomTitle;

    private User host;

    private int headcount;

    private String password;

    private Timestamp createDate;

    private String imageName;

    @Builder
    public LiveRoomInfoRes(RoomInfo roomInfo) {
        this.roomNo = roomInfo.getRoomNo();
        this.roomTitle = roomInfo.getRoomTitle();
        this.host = roomInfo.getHost();
        this.headcount = roomInfo.getHeadcount();
        this.password = roomInfo.getPassword();
        this.createDate = roomInfo.getCreateDtm();
        this.imageName = roomInfo.getImageName();
    }

}
