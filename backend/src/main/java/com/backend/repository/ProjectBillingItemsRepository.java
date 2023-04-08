package com.backend.repository;

import com.backend.model.ProjectBillingItems;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectBillingItemsRepository extends JpaRepository<ProjectBillingItems, Long> {
}
