package com.ssafy.raonzena.db.repository;

import com.ssafy.raonzena.db.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameChatRepository extends JpaRepository<Chat, Long> {

    Chat findByChatNo(long randomNo);
}
