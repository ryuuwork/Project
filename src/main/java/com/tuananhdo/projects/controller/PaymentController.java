package com.tuananhdo.projects.controller;

import com.razorpay.RazorpayException;
import com.tuananhdo.projects.entity.User;
import com.tuananhdo.projects.exception.ResourceNotFoundException;
import com.tuananhdo.projects.payload.PaymentResponse;
import com.tuananhdo.projects.service.PaymentService;
import com.tuananhdo.projects.service.UserService;
import com.tuananhdo.projects.utils.PlanType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

    private final PaymentService paymentService;
    private final UserService userService;

    public PaymentController(PaymentService paymentService, UserService userService) {
        this.paymentService = paymentService;
        this.userService = userService;
    }

    @PostMapping("/{planType}")
    public ResponseEntity<?> createPayment(@PathVariable PlanType planType,
                                           @RequestHeader("Authorization") String tokenJWT) throws ResourceNotFoundException, RazorpayException {
        User user = userService.findUsernameByJWT(tokenJWT);
        PaymentResponse paymentResponse = paymentService.createPayment(user,planType);
        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
    }

}
