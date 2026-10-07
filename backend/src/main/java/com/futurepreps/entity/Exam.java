package com.futurepreps.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "exams")
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String slug;

    @Column(name = "conducting_body", length = 150)
    private String conductingBody;

    @Column(length = 60)
    private String category; // e.g. Engineering, Medical, Govt Jobs

    @Column(name = "govt_type", nullable = false, length = 20)
    private String govtType = "govt"; // govt, non_govt

    @Column(length = 60)
    private String level; // National, State, University

    @Column(length = 255)
    private String website;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    public Exam() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getConductingBody() { return conductingBody; }
    public void setConductingBody(String conductingBody) { this.conductingBody = conductingBody; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getGovtType() { return govtType; }
    public void setGovtType(String govtType) { this.govtType = govtType; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
