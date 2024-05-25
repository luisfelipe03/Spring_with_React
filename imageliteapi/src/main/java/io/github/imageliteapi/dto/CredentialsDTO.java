package io.github.imageliteapi.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CredentialsDTO {
    private String email;
    private String password;
}
