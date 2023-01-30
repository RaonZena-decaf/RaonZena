package com.ssafy.raonzena.db.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicInsert
@Table(name = "board")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_no", nullable = false)
    private Long boardNo;

    @Column(name = "board_image_url", nullable = false, length = 200)
    private String boardImageUrl;

    @Column(name = "content")
    private String content;

    @Column(name = "user_no",nullable = false)
    private long userNo;

    @Column(name = "create_dtm", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createDtm;

    @Column(name = "first_user")
    private long firstUser;

    @Column(name = "second_user")
    private long secondUser;

    @Column(name = "third_user")
    private long thirdUser;

}