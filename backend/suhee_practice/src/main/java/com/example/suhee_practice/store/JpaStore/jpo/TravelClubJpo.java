package com.example.suhee_practice.store.JpaStore.jpo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TravelClubJpo {
    @Id
    private String id;
    private String name;
    private String intro;
    private long foundationTime;
}
