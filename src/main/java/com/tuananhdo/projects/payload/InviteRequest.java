package com.tuananhdo.projects.payload;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class InviteRequest {
    private String email;
    private Long projectId;
}
