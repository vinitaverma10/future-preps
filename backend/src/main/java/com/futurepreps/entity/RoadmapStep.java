package com.futurepreps.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "roadmap_steps")
public class RoadmapStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "roadmap_id", insertable = false, updatable = false)
    private Integer roadmapId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roadmap_id", nullable = false)
    @JsonIgnore
    private Roadmap roadmap;

    @Column(name = "parent_step_id")
    private Integer parentStepId;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 60)
    private String duration;

    @Column(name = "step_order", nullable = false)
    private Integer stepOrder = 0;

    @OneToMany(mappedBy = "step", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Resource> resources = new ArrayList<>();

    public RoadmapStep() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getRoadmapId() { return roadmapId; }
    public void setRoadmapId(Integer roadmapId) { this.roadmapId = roadmapId; }

    public Roadmap getRoadmap() { return roadmap; }
    public void setRoadmap(Roadmap roadmap) { this.roadmap = roadmap; }

    public Integer getParentStepId() { return parentStepId; }
    public void setParentStepId(Integer parentStepId) { this.parentStepId = parentStepId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public Integer getStepOrder() { return stepOrder; }
    public void setStepOrder(Integer stepOrder) { this.stepOrder = stepOrder; }

    public List<Resource> getResources() { return resources; }
    public void setResources(List<Resource> resources) { this.resources = resources; }
}
