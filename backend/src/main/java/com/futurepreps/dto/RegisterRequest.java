package com.futurepreps.dto;

public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String role; // student, faculty
    private String classLevel;
    private String state;

    public RegisterRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getClassLevel() { return classLevel; }
    public void setClassLevel(String classLevel) { this.classLevel = classLevel; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
}
