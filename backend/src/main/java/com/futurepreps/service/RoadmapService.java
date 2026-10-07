package com.futurepreps.service;

import com.futurepreps.entity.Roadmap;
import com.futurepreps.entity.RoadmapStep;
import com.futurepreps.repository.ResourceRepository;
import com.futurepreps.repository.RoadmapRepository;
import com.futurepreps.repository.RoadmapStepRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class RoadmapService {

    private final RoadmapRepository roadmapRepository;
    private final RoadmapStepRepository roadmapStepRepository;
    private final ResourceRepository resourceRepository;

    public RoadmapService(RoadmapRepository roadmapRepository,
                          RoadmapStepRepository roadmapStepRepository,
                          ResourceRepository resourceRepository) {
        this.roadmapRepository = roadmapRepository;
        this.roadmapStepRepository = roadmapStepRepository;
        this.resourceRepository = resourceRepository;
    }

    public List<Roadmap> getAllRoadmaps(String category) {
        if (category != null && !category.isEmpty()) {
            return roadmapRepository.findByCategoryIgnoreCase(category);
        }
        return roadmapRepository.findAll();
    }

    public Optional<Map<String, Object>> getRoadmapDetailBySlug(String slug) {
        Optional<Roadmap> roadmapOpt = roadmapRepository.findBySlug(slug);
        if (roadmapOpt.isEmpty()) {
            return Optional.empty();
        }

        Roadmap roadmap = roadmapOpt.get();
        List<RoadmapStep> steps = roadmapStepRepository.findByRoadmapIdOrderByStepOrderAsc(roadmap.getId());

        // Attach resources to each step
        for (RoadmapStep step : steps) {
            step.setResources(resourceRepository.findByStepId(step.getId()));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("roadmap", roadmap);
        response.put("steps", steps);
        return Optional.of(response);
    }

    public Roadmap createRoadmap(Roadmap roadmap) {
        if (roadmap.getSlug() == null || roadmap.getSlug().isEmpty()) {
            roadmap.setSlug(roadmap.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-"));
        }
        return roadmapRepository.save(roadmap);
    }
}
