package com.ming.financial_management_system_backend.repository;

import com.ming.financial_management_system_backend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
