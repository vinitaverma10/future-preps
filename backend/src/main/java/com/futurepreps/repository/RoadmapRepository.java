package com.futurepreps.repository;

import com.futurepreps.entity.Roadmap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoadmapRepository extends JpaRepository<Roadmap, Integer> {
    Optional<Roadmap> findBySlug(String slug);
    List<Roadmap> findByCategoryIgnoreCase(String category);
}
