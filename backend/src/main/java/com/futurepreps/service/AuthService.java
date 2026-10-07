package com.futurepreps.service;

import com.futurepreps.dto.AuthRequest;
import com.futurepreps.dto.AuthResponse;
import com.futurepreps.dto.RegisterRequest;
import com.futurepreps.entity.User;
import com.futurepreps.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("Email already registered: " + req.getEmail());
        }

        String hashedPassword = BCrypt.hashpw(req.getPassword(), BCrypt.gensalt());
        User user = new User(
                req.getName(),
                req.getEmail(),
                hashedPassword,
                req.getRole() != null ? req.getRole() : "student",
                req.getClassLevel(),
                req.getState()
        );

        User saved = userRepository.save(user);
        String mockToken = UUID.randomUUID().toString();

        return new AuthResponse(saved.getId(), saved.getName(), saved.getEmail(), saved.getRole(), mockToken, "Registration successful!");
    }

    public AuthResponse login(AuthRequest req) {
        Optional<User> userOpt = userRepository.findByEmail(req.getEmail());
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        User user = userOpt.get();
        if (!BCrypt.checkpw(req.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String mockToken = UUID.randomUUID().toString();
        return new AuthResponse(user.getId(), user.getName(), user.getEmail(), user.getRole(), mockToken, "Login successful!");
    }
}
