package io.github.imageliteapi.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
    private String name;
    private String email;
    private String password;
}
