package io.github.imageliteapi.services;

import io.github.imageliteapi.config.jwt.AccessToken;
import io.github.imageliteapi.models.User;

public interface UserService {

    User getByEmail(String email);
    User save(User user);
    AccessToken authenticate(String email, String password);
}
