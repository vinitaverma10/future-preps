package com.futurepreps.controller;

import com.futurepreps.entity.Roadmap;
import com.futurepreps.service.RoadmapService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/roadmaps")
public class RoadmapController {

    private final RoadmapService roadmapService;

    public RoadmapController(RoadmapService roadmapService) {
        this.roadmapService = roadmapService;
    }

    @GetMapping
    public ResponseEntity<List<Roadmap>> getAllRoadmaps(@RequestParam(required = false) String category) {
        return ResponseEntity.ok(roadmapService.getAllRoadmaps(category));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Map<String, Object>> getRoadmapBySlug(@PathVariable String slug) {
        return roadmapService.getRoadmapDetailBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Roadmap> createRoadmap(@RequestBody Roadmap roadmap) {
        return ResponseEntity.ok(roadmapService.createRoadmap(roadmap));
    }
}
