package com.ssafy.raonzena.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GameScoreRes {

    private long roomNo;

    private List<List<Long>> userData;

}
