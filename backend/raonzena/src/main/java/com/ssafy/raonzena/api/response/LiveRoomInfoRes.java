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

    private Integer roomNo;

    private String roomTitle;

    private User host;

    private Integer headcount;

    private Integer password;

    private Timestamp createDate;

}
