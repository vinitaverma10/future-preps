package com.futurepreps.repository;

import com.futurepreps.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Integer> {
    List<Resource> findByExamId(Integer examId);
    List<Resource> findByStepId(Integer stepId);
    List<Resource> findByStatus(String status);
}
