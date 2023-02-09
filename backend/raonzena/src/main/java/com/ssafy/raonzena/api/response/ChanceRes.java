package com.ssafy.raonzena.api.response;

import com.ssafy.raonzena.db.entity.Chance;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChanceRes {

    private String chanceId;

    private String item;

    @Builder
    public ChanceRes(Chance chance) {
        this.chanceId = chance.getChanceId();
        this.item = chance.getItem();
    }
}
