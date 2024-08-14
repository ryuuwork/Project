package com.tuananhdo.projects.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class JWTAuthResponse {
    public static final String BEARER = "Bearer";
    private String accessToken;
    private String tokenType = BEARER;
}
