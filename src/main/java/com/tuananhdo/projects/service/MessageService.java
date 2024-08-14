package com.tuananhdo.projects.service;

import com.tuananhdo.projects.entity.Chat;
import com.tuananhdo.projects.entity.Message;
import com.tuananhdo.projects.entity.User;
import com.tuananhdo.projects.exception.ResourceNotFoundException;
import com.tuananhdo.projects.mapper.MessageMapper;
import com.tuananhdo.projects.payload.MessageDTO;
import com.tuananhdo.projects.payload.MessageRequest;
import com.tuananhdo.projects.repository.MessageRepository;
import com.tuananhdo.projects.repository.ProjectRepository;
import com.tuananhdo.projects.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final MessageMapper messageMapper;

    public MessageDTO sendMessage(MessageRequest messageRequest) {
        User user = userRepository.findById(messageRequest.getSenderId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", messageRequest.getSenderId()));
        Chat chat = projectRepository.findById(messageRequest.getProjectId()).get().getChat();

        Message message = new Message();
        message.setSender(user);
        message.setChat(chat);
        message.setContent(messageRequest.getContent());
        message.setCreatedAt(LocalDateTime.now());

        Message savedMessage = messageRepository.save(message);

        chat.getMessages().add(savedMessage);
        return messageMapper.mapToMessageDTO(savedMessage);
    }

    public List<Message> getMessageByProject(Long projectId) {
        Chat chat = projectRepository.findById(projectId).get().getChat();
        return messageRepository.findByChatIdOrderByCreatedAtAsc(chat.getId());
    }
}
