package com.ssafy.raonzena.db.repository;

import com.ssafy.raonzena.db.entity.PersonQuiz;
import com.ssafy.raonzena.db.entity.SpeakAndDraw;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GamePersonQuizRepository extends JpaRepository<PersonQuiz, Long> {
    //인물퀴즈 사진
    PersonQuiz findByPersonNO(long randomNo);
}
