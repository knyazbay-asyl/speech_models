package service.work.adminwork1.controller;

import service.work.adminwork1.model.UserCredentials;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LoginController {

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserCredentials credentials) {
        // Здесь будет логика для проверки данных пользователя (например, аутентификация)
        if ("admin".equals(credentials.getUsername()) && "admin123".equals(credentials.getPassword())) {
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
