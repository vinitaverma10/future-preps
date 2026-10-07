package com.futurepreps.service;

import com.futurepreps.entity.Exam;
import com.futurepreps.entity.Resource;
import com.futurepreps.repository.ExamRepository;
import com.futurepreps.repository.ResourceRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ExamService {

    private final ExamRepository examRepository;
    private final ResourceRepository resourceRepository;

    public ExamService(ExamRepository examRepository, ResourceRepository resourceRepository) {
        this.examRepository = examRepository;
        this.resourceRepository = resourceRepository;
    }

    public List<Exam> getAllExams(String category, String govtType) {
        if (category != null && !category.isEmpty()) {
            return examRepository.findByCategoryIgnoreCase(category);
        }
        if (govtType != null && !govtType.isEmpty()) {
            return examRepository.findByGovtType(govtType);
        }
        return examRepository.findAll();
    }

    public Optional<Map<String, Object>> getExamDetailBySlug(String slug) {
        Optional<Exam> examOpt = examRepository.findBySlug(slug);
        if (examOpt.isEmpty()) {
            return Optional.empty();
        }

        Exam exam = examOpt.get();
        List<Resource> resources = resourceRepository.findByExamId(exam.getId());

        Map<String, Object> result = new HashMap<>();
        result.put("exam", exam);
        result.put("resources", resources);
        return Optional.of(result);
    }

    public Exam createExam(Exam exam) {
        if (exam.getSlug() == null || exam.getSlug().isEmpty()) {
            exam.setSlug(exam.getName().toLowerCase().replaceAll("[^a-z0-9]+", "-"));
        }
        return examRepository.save(exam);
    }
}
