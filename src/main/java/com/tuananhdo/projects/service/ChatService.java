package com.tuananhdo.projects.service;

import com.tuananhdo.projects.entity.Chat;
import com.tuananhdo.projects.repository.ChatRepository;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
    private final ChatRepository chatRepository;
    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    public Chat create(Chat chat) {
        return chatRepository.save(chat);
    }

}
