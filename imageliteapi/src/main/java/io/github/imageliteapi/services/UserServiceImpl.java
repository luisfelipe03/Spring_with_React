package io.github.imageliteapi.services;

import io.github.imageliteapi.config.jwt.AccessToken;
import io.github.imageliteapi.config.jwt.JwtService;
import io.github.imageliteapi.exception.DuplicatedTupleException;
import io.github.imageliteapi.models.User;
import io.github.imageliteapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements  UserService {

    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    @Override
    public User getByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    @Transactional
    public User save(User user) {
        var existingUser = getByEmail(user.getEmail());
        if(existingUser != null) {
            throw new DuplicatedTupleException("Usuário já cadastrado");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user);
    }

    @Override
    public AccessToken authenticate(String email, String password) {
        var user = getByEmail(email);
        if(user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return null;
        }

        return jwtService.generateToken(user);
    }
}
