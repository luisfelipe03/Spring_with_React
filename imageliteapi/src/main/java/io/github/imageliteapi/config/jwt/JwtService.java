package io.github.imageliteapi.config.jwt;

import io.github.imageliteapi.models.User;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;

@Service
public class JwtService {

    @Autowired
    SecretKeyGenerator keyGenerator;

    public AccessToken generateToken(User user) {

        var key = keyGenerator.getKey();
        var expirationTime = expiration();
        var claims = generateTokenClaims(user);

        String token = Jwts
                .builder()
                .signWith(key)
                .subject(user.getEmail())
                .expiration(expirationTime)
                .claims(claims)
                .compact();

        return new AccessToken(token);
    }

    private Date expiration() {
        return new Date(System.currentTimeMillis() + 3600000);
    }

    private Map<String, Object> generateTokenClaims(User user) {
        return Map.of(
                "nome", user.getNome()
        );
    }
}