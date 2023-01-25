package com.ssafy.raonzena.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "person_quiz")
public class PersonQuiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "person_no", nullable = false)
    private Long personNO;

    @Column(name = "answer", nullable = false, length = 45)
    private String answer;

    @Column(name = "image", nullable = false, length = 500)
    private String image;

}