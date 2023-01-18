package com.ssafy.raonzena.db.entity;

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

    @Column(name = "exp", columnDefinition = "0")
    private Integer exp;

    @Column(name = "level", columnDefinition = "1")
    private Integer level;

    @Column(name = "create_date", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createDate;

    @Column(name = "user_image", length = 500)
    private String userImage;

}