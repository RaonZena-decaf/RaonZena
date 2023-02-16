package com.ssafy.raonzena.db.repository;

import com.ssafy.raonzena.db.entity.SpeakAndDraw;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameSpeakAndDrawRepository extends JpaRepository<SpeakAndDraw, Long> {
    //고요속 외침 키워드
    SpeakAndDraw findBySpeekNo(long randomNo);
}
