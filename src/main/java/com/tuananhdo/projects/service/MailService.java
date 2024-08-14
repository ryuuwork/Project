package com.tuananhdo.projects.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Value("${spring.mail.subject}")
    private String subject;

    @Value("${spring.mail.text}")
    private String textTemplate;

    private final JavaMailSender mailSender;
    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendMail(String email, String linkTo) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,"UTF-8");
        String text = String.format(textTemplate,linkTo);
        helper.setSubject(subject);
        helper.setText(text);
        helper.setTo(email);
        mailSender.send(mimeMessage);
    }
}
