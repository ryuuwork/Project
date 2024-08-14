package com.tuananhdo.projects.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    private String resourceName;
    private String name;
    private long value;

    public ResourceNotFoundException(String resourceName, String name, long value) {
        super(String.format("%s not found with %s: '%s'", resourceName, name, value));
        this.resourceName = resourceName;
        this.name = name;
        this.value = value;
    }

    public ResourceNotFoundException(String resourceName) {
        super(String.format("Can't find any with %s: ", resourceName));
        this.name = resourceName;
    }

}
