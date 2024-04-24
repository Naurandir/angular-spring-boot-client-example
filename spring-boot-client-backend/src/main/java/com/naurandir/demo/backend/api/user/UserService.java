package com.naurandir.demo.backend.api.user;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {

    private final List<User> users = Collections.synchronizedList(new ArrayList<>()); // synchronized list for thread safety.
    
    @PostConstruct
    void init() {
        createUser("admin", "Demo", "Admin");
        
        for (int i=0; i<10; i++) {
            createUser("user" + i, "Demo", "User " + i);
        }
        
        users.forEach(user -> log.info("init: created user [{}]", user));
    }
    
    List<UserDto> getUsers() {
        return users.stream()
                .map(this::mapUserToDto)
                .toList();
    }
    
    UserDto getUser(String publicId) {
        Optional<User> foundUser = users.stream()
                .filter(user -> user.getPublicId().equals(publicId))
                .findFirst();
        
        if (foundUser.isEmpty()) {
            throw new UserActionException("user-not-found", "the user with the given id [%s] could not be found", publicId);
        }
        
        return mapUserToDto(foundUser.get());
    }
    
    UserDto createUser(UserDto userDto) {
        log.info("createUser: create user [{}]", userDto);
        Optional<User> userwithSameUsername = users.stream()
                .filter(user -> user.getUsername().equals(userDto.username()))
                .findFirst();
        
        if (userwithSameUsername.isPresent()) {
            throw new UserActionException("user-exists", "the user with the given username [%s] already exists", userDto.username());
        }
        
        User createdUser = createUser(userDto.username(), userDto.firstName(), userDto.lastName());
        return mapUserToDto(createdUser);
    }
    
    void deleteUser(String publicId) {
        log.info("deleteUser: delete user [{}]", publicId);
        Optional<User> foundUser = users.stream()
                .filter(user -> user.getPublicId().equals(publicId))
                .findFirst();
        
        if (foundUser.isEmpty()) {
            throw new UserActionException("user-not-found", "the user with the given id [%s] could not be found", publicId);
        }
        
        User user = foundUser.get();
        if ("admin".equals(user.getUsername())) {
            throw new UserActionException("user-not-deletable", "the user with the given id [%s] is the admin user and not allowed to be deleted", publicId);
        }
        
        users.remove(user);
    }
    
    private User createUser(String username, String firstName, String lastName) {
        User user = User.builder()
                .publicId(UUID.randomUUID().toString())
                .username(username)
                .firstName(firstName)
                .lastName(lastName)
                .build();
        
        users.add(user);
        
        return user;
    }
    
    private UserDto mapUserToDto(User user) {
        return new UserDto(user.getPublicId(), user.getUsername(), user.getFirstName(), user.getLastName());
    }
}
