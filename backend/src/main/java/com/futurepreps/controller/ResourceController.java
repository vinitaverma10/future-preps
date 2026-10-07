package com.futurepreps.controller;

import com.futurepreps.entity.Resource;
import com.futurepreps.repository.ResourceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourceRepository resourceRepository;

    public ResourceController(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    @GetMapping
    public ResponseEntity<List<Resource>> getAllResources(@RequestParam(defaultValue = "approved") String status) {
        return ResponseEntity.ok(resourceRepository.findByStatus(status));
    }

    @PostMapping("/suggest")
    public ResponseEntity<Resource> suggestResource(@RequestBody Resource resource) {
        resource.setStatus("pending"); // Needs admin approval
        return ResponseEntity.ok(resourceRepository.save(resource));
    }
}
