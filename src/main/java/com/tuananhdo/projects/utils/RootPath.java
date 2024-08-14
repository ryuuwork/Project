package com.tuananhdo.projects.utils;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class RootPath {

    //  get base url of localhost : example : localhost:8888
    public static String getBaseURL() {
        return ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
    }
}
