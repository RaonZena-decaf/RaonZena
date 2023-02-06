package com.ssafy.raonzena.db.repository;

import com.ssafy.raonzena.db.entity.SpeakAndDraw;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameSpeakAndDrawRepository extends JpaRepository<SpeakAndDraw, Long> {

    SpeakAndDraw findBySpeekNo(long randomNo);
}
