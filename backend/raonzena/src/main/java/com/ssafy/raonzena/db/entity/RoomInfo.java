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
@Table(name = "room_info")
public class RoomInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_no", nullable = false)
    private Long roomNo;

    @Column(name = "room_title", nullable = false)
    private String roomTitle;

    @ManyToOne
    @JoinColumn(name = "host", nullable = false)
    private User host;

    @Column(name = "headcount", nullable = false)
    private Integer headcount;

    @Column(name = "password")
    private Integer password;

    @Column(name = "create_date", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createDate;

}