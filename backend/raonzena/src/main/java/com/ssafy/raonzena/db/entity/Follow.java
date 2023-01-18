package com.ssafy.raonzena.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "follow")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_no", nullable = false)
    private Integer followNo;

    @Column(name = "follower", nullable = false)
    private Integer follower;

    @Column(name = "followee", nullable = false)
    private Integer followee;

}