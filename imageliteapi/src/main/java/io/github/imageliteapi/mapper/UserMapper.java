package io.github.imageliteapi.mapper;

import io.github.imageliteapi.dto.UserDTO;
import io.github.imageliteapi.models.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User mapToUser(UserDTO dto) {
        return User.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .nome(dto.getName())
                .build();
    }

//    public UserDTO mapToUserDTO(User user) {
//
//    }
}
