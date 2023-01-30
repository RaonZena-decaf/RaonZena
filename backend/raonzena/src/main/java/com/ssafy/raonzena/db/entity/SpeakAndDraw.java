package com.ssafy.raonzena.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "speak_and_draw")
public class SpeakAndDraw {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "speak_no", nullable = false)
    private Long speekNo;

    @Column(name = "answer", nullable = false, length = 100)
    private String answer;

}