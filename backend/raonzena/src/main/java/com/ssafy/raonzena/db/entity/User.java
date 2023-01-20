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
    private Integer userNo;

    @Column(name = "user_id", nullable = false, length = 100)
    private String userId;

    @Column(name = "user_name", nullable = false, length = 45)
    private String userName;

    @Column(name = "exp")
    private Integer exp;

    @Column(name = "level")
    private Integer level;

    @Column(name = "create_date", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createDate;

    @Column(name = "user_image", length = 500)
    private String userImage;

    @Builder

    public User(Integer userNo, String userId, String userName, Integer exp, Integer level, Timestamp createDate, String userImage) {
        this.userNo = userNo;
        this.userId = userId;
        this.userName = userName;
        this.exp = exp;
        this.level = level;
        this.createDate = createDate;
        this.userImage = userImage;
    }
}