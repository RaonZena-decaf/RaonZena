package com.ssafy.raonzena.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "speek_and_draw")
public class SpeekAndDraw {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "speek_no", nullable = false)
    private Integer speekNo;

    @Column(name = "answer", nullable = false)
    private String answer;

}