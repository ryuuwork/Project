package com.tuananhdo.projects.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ProjectException extends RuntimeException {
    private final HttpStatus status;
    private final String message;

    public ProjectException(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
}
