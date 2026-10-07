package com.futurepreps.repository;

import com.futurepreps.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Integer> {
    Optional<Exam> findBySlug(String slug);
    List<Exam> findByCategoryIgnoreCase(String category);
    List<Exam> findByGovtType(String govtType);
}
