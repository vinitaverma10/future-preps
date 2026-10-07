package com.futurepreps.repository;

import com.futurepreps.entity.RoadmapStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoadmapStepRepository extends JpaRepository<RoadmapStep, Integer> {
    List<RoadmapStep> findByRoadmapIdOrderByStepOrderAsc(Integer roadmapId);
}
