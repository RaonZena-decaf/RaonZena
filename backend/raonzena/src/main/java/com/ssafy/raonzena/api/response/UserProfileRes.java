package com.ssafy.raonzena.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

/**
 * 유저 프로필 조회 API ([GET] /api/v1/profile?keyword=) 요청에 대한 응답값 정의.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileRes {

    private long userNo;

    private String userId;

    private String userName;

    private Integer exp;

    private Integer level;

    private Timestamp createDate;

    private String userImage;
}
