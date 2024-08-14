package com.tuananhdo.projects.payload;

import com.tuananhdo.projects.entity.Chat;
import com.tuananhdo.projects.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class MessageDTO {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private Chat chat;
    private User sender;
}
