package com.ssafy.raonzena.api.request;

import lombok.*;

/**
 * 게임방 생성 API ([POST] /api/v1/room) 요청에 필요한 리퀘스트 바디 정의.
 */

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomReq {

    private String roomTitle;

    private Integer headcount;

    private Integer password;

}
