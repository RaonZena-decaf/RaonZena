package com.ssafy.raonzena.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Setter
@Getter
@NoArgsConstructor
@DynamicInsert
@Table(name = "board")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_no", nullable = false)
    private Long boardNo;

    @Column(name = "board_image", nullable = false, length = 500)
    private String boardImage;

    @Column(name = "content")
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_no",nullable = false)
    private User userNo;

    @Column(name = "create_date", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createDate;

    @Column(name = "first_user")
    private Integer firstUser;

    @Column(name = "second_user")
    private Integer secondUser;

    @Column(name = "third_user")
    private Integer thirdUser;

}