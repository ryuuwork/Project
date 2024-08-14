package com.tuananhdo.projects.payload;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MessageRequest {
    private Long senderId;
    private String content;
    private Long projectId;
}
