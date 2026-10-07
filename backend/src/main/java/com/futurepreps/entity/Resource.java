package com.futurepreps.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resources")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 20)
    private String type; // youtube, pdf, website, notes

    @Column(nullable = false, length = 500)
    private String url;

    @Column(name = "exam_id")
    private Integer examId;

    @Column(name = "step_id", insertable = false, updatable = false)
    private Integer stepId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "step_id")
    @JsonIgnore
    private RoadmapStep step;

    @Column(nullable = false, length = 20)
    private String status = "pending"; // pending, approved

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    public Resource() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public Integer getExamId() { return examId; }
    public void setExamId(Integer examId) { this.examId = examId; }

    public Integer getStepId() { return stepId; }
    public void setStepId(Integer stepId) { this.stepId = stepId; }

    public RoadmapStep getStep() { return step; }
    public void setStep(RoadmapStep step) { this.step = step; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
