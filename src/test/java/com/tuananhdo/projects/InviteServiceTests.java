package com.tuananhdo.projects;

import org.junit.jupiter.api.Test;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class InviteServiceTests {

    private static String getBaseURL(){
        return ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
    }

    @Test
    public void test(){
        System.out.println(getBaseURL());
    }
}
