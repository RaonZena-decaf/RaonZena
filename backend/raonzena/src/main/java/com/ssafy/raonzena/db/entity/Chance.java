package com.ssafy.raonzena.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "chance")
public class Chance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chance_no", nullable = false)
    private Long chanceNo;

    @Column(name = "chance_id")
    private String chanceId;

    @Column(name = "item")
    private String item;

}