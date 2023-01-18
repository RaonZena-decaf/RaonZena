package com.ssafy.raonzena.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private int user_no;
    private String user_id;
    private String user_name;
    private int exp;
    private int level;
    private String user_image;
}
