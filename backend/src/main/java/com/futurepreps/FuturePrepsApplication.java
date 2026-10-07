package com.futurepreps;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FuturePrepsApplication {

    public static void main(String[] args) {
        SpringApplication.run(FuturePrepsApplication.class, args);
        System.out.println("==================================================");
        System.out.println("🚀 Future-Preps Backend is running on port 8080!");
        System.out.println("👉 http://localhost:8080/api/exams");
        System.out.println("👉 http://localhost:8080/api/roadmaps");
        System.out.println("==================================================");
    }
}
