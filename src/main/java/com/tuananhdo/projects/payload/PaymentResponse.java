package com.tuananhdo.projects.payload;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PaymentResponse {
    private String paymentURL;
    private String paymentId;
}
