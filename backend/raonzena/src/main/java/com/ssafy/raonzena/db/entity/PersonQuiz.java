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

    @Column(name = "person_answer", nullable = false, length = 45)
    private String personAnswer;

    @Column(name = "image_url", nullable = false, length = 200)
    private String imageUrl;
}