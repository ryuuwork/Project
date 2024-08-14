package com.tuananhdo.projects.utils;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Setter
@Getter
@Component
public class MailProperties {

    @Value("{spring.mail.subject}")
    private String subject;

    @Value("{spring.mail.text}")
    private String text;
}
