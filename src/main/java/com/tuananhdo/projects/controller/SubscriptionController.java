package com.tuananhdo.projects.controller;

import com.tuananhdo.projects.entity.Subscription;
import com.tuananhdo.projects.entity.User;
import com.tuananhdo.projects.exception.ResourceNotFoundException;
import com.tuananhdo.projects.service.SubscriptionService;
import com.tuananhdo.projects.service.UserService;
import com.tuananhdo.projects.utils.PlanType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/subscriptions")
public class SubscriptionController {
    private final SubscriptionService subscriptionService;
    private final UserService userService;

    public SubscriptionController(SubscriptionService subscriptionService, UserService userService) {
        this.subscriptionService = subscriptionService;
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserSubscription(@RequestHeader("Authorization") String tokenJWT) throws ResourceNotFoundException {
        User user = userService.findUsernameByJWT(tokenJWT);
        Subscription subscription = subscriptionService.getUserSubscription(user.getId());
        return new ResponseEntity<>(subscription, HttpStatus.OK);
    }


    @PatchMapping("/upgrade")
    public ResponseEntity<?> upgradeSubscription(@RequestHeader("Authorization") String tokenJWT,
                                                 @RequestParam PlanType planType) throws ResourceNotFoundException {
        User user = userService.findUsernameByJWT(tokenJWT);
        Subscription subscription = subscriptionService.upgradeSubscription(user.getId(),planType);
        return new ResponseEntity<>(subscription, HttpStatus.OK);
    }


}
