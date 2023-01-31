package com.ssafy.raonzena.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DynamicInsert
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_no", nullable = false)
    private Long userNo;

    @Column(name = "user_id", nullable = false, length = 100)
    private String userId;

    @Column(name = "user_name", nullable = false, length = 45)
    private String userName;

    @Column(name = "exp")
    private Integer exp;

    @Column(name = "level")
    private Integer level;

    @Column(name = "create_dtm", updatable = false)
    private Timestamp createDtm;

    @Column(name = "user_image_url", length = 200)
    private String userImageUrl;

    @Builder
    public User(long userNo, String userId, String userName, Integer exp, Integer level, Timestamp createDtm, String userImageUrl) {
        this.userNo = userNo;
        this.userId = userId;
        this.userName = userName;
        this.exp = exp;
        this.level = level;
        this.createDtm = createDtm;
        this.userImageUrl = userImageUrl;
    }

    @Override
    public String toString() {
        return "User{" +
                "userNo=" + userNo +
                ", userId='" + userId + '\'' +
                ", userName='" + userName + '\'' +
                ", exp=" + exp +
                ", level=" + level +
                ", createDtm=" + createDtm +
                ", userImageUrl='" + userImageUrl + '\'' +
                '}';
    }
}