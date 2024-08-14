package com.tuananhdo.projects.mapper;

import com.tuananhdo.projects.entity.Message;
import com.tuananhdo.projects.payload.MessageDTO;
import org.springframework.stereotype.Component;

@Component
public class MessageMapper {

    public MessageDTO mapToMessageDTO(Message message) {
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setId(message.getId());
        messageDTO.setContent(message.getContent());
        messageDTO.setSender(message.getSender());
        messageDTO.setChat(message.getChat());
        messageDTO.setCreatedAt(message.getCreatedAt());
        return messageDTO;
    }
}
