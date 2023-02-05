package com.ssafy.raonzena.db.repository;

import com.ssafy.raonzena.db.entity.ObjectFast;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameObjectFastRepository extends JpaRepository<ObjectFast, Long> {

    ObjectFast findByObjectNo(long randomNo);
}
