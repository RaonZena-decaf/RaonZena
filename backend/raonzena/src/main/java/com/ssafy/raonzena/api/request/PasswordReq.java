package com.ssafy.raonzena.api.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PasswordReq {

    long roomNo;
    String inputPassword;
}
