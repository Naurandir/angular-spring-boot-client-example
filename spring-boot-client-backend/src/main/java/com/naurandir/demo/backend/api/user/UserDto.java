package com.naurandir.demo.backend.api.user;

import org.springframework.lang.NonNull;

import jakarta.validation.constraints.Size;

public record UserDto(
        
        String publicId,
        
        @Size(max = 20, message = "text should not exceed 20 characters")
        @NonNull
        String username,
        
        @Size(max = 30, message = "text should not exceed 30 characters")
        @NonNull
        String firstName,
        
        @Size(max = 30, message = "text should not exceed 30 characters")
        @NonNull
        String lastName
        ) {
}
