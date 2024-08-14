package com.tuananhdo.projects.payload;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommentDTO {
    private Long taskId;
    private String content;
}
