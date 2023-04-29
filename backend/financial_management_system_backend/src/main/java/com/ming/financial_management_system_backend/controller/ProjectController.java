package com.ming.financial_management_system_backend.controller;

import com.ming.financial_management_system_backend.exception.NotFoundException;
import com.ming.financial_management_system_backend.model.Project;
import com.ming.financial_management_system_backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping("/{id}")
    Project getProjectById(@PathVariable Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Could not found this project with id: " + id));
    }

    

}
