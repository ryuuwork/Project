package com.tuananhdo.projects.service;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.tuananhdo.projects.entity.User;
import com.tuananhdo.projects.payload.PaymentResponse;
import com.tuananhdo.projects.utils.PlanType;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    private static final int MONTHLY_AMOUNT = 799 * 100;
    private static final double ANNUAL_DISCOUNT_RATE = 0.7;
    private static final int MONTHS_IN_YEAR = 12;

    @Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecret;

    public PaymentResponse createPayment(User user, PlanType planType) throws RazorpayException {
        double amount;
        if (planType == PlanType.ANNUALLY) {
            amount = MONTHLY_AMOUNT * MONTHS_IN_YEAR * ANNUAL_DISCOUNT_RATE;
        } else {
            amount = MONTHLY_AMOUNT;
        }

        RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecret);
        JSONObject paymentRequest = new JSONObject();

        paymentRequest.put("amount", amount);
        paymentRequest.put("currency", "VND");

        JSONObject customer = new JSONObject();
        customer.put("name", user.getFirstName() + user.getLastName());
        customer.put("email", user.getEmail());

        JSONObject notify = new JSONObject();
        notify.put("email", true);

        paymentRequest.put("customer", customer);
        paymentRequest.put("notify", notify);
        paymentRequest.put("callback_url", "http://localhost:5173/upgrade/success?planType=" + planType);

        PaymentLink payment = razorpayClient.paymentLink.create(paymentRequest);
        String paymentId = payment.get("id");
        String paymentURL = payment.get("short_url");

        PaymentResponse paymentResponse = new PaymentResponse();
        paymentResponse.setPaymentId(paymentId);
        paymentResponse.setPaymentURL(paymentURL);
        return paymentResponse;
    }
}
