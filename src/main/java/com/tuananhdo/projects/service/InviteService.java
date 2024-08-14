package com.tuananhdo.projects.service;

import com.tuananhdo.projects.entity.Invite;
import com.tuananhdo.projects.exception.ResourceNotFoundException;
import com.tuananhdo.projects.repository.InviteRepository;
import jakarta.mail.MessagingException;
import net.bytebuddy.utility.RandomString;
import org.springframework.stereotype.Service;

@Service
public class InviteService {
    private final InviteRepository inviteRepository;
    private final MailService mailService;

    public InviteService(InviteRepository inviteRepository, MailService mailService) {
        this.inviteRepository = inviteRepository;
        this.mailService = mailService;
    }

    public void sendInvite(String email, Long projectId) throws MessagingException {
        String inviteToken = RandomString.make(30);
        Invite invite = new Invite();
        invite.setEmail(email);
        invite.setProjectId(projectId);
        invite.setToken(inviteToken);
        inviteRepository.save(invite);

        String inviteLink = "http://localhost:5173/invite/accept?token=" + inviteToken;
        mailService.sendMail(email, inviteLink);
    }


    public Invite acceptInvite(String token) {
        return findByToken(token);
    }

    public Invite findByToken(String token){
        return inviteRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("token"));
    }

    public String getTokenByUser(String email) {
        Invite invite = inviteRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("email"));
        return invite.getToken();
    }

    public void deleteToken(String token) {
        Invite invite = findByToken(token);
        inviteRepository.delete(invite);
    }
}
