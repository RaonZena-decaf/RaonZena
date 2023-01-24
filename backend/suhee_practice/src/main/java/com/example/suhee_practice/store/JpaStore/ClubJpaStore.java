package com.example.suhee_practice.store.JpaStore;

import com.example.suhee_practice.store.JpaStore.jpo.TravelClubJpo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public class ClubJpaStore implements JpaRepository<TravelClubJpo,Long> {

}
