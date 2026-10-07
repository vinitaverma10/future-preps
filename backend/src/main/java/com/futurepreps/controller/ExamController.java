package com.futurepreps.controller;

import com.futurepreps.entity.Exam;
import com.futurepreps.service.ExamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    private final ExamService examService;

    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @GetMapping
    public ResponseEntity<List<Exam>> getAllExams(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String govtType) {
        return ResponseEntity.ok(examService.getAllExams(category, govtType));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Map<String, Object>> getExamBySlug(@PathVariable String slug) {
        return examService.getExamDetailBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        return ResponseEntity.ok(examService.createExam(exam));
    }
}
