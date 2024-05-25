package io.github.imageliteapi.controllers;

import io.github.imageliteapi.dto.CredentialsDTO;
import io.github.imageliteapi.dto.UserDTO;
import io.github.imageliteapi.exception.DuplicatedTupleException;
import io.github.imageliteapi.mapper.UserMapper;
import io.github.imageliteapi.models.User;
import io.github.imageliteapi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserService service;
    @Autowired
    UserMapper mapper;

    @PostMapping
    public ResponseEntity save(@RequestBody UserDTO dto) {
        try {
            User user = mapper.mapToUser(dto);
            service.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (DuplicatedTupleException e) {
            Map<String, String> json = Map.of("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(json);
        }
    }

    @PostMapping("/auth")
    public ResponseEntity authenticate(@RequestBody CredentialsDTO dto) {
        var token = service.authenticate(dto.getEmail(), dto.getPassword());
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(token);
    }
}
