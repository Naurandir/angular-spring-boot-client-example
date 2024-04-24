package com.naurandir.demo.backend.api.user;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class User {

    private final String publicId;
    private String username;
    private String firstName;
    private String lastName;  
}
