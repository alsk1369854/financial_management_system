package com.ming.financial_management_system_backend.controller;

import com.ming.financial_management_system_backend.model.Project;
import com.ming.financial_management_system_backend.service.ProjectService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Tag(name = "Project", description = "Project APIs")
@CrossOrigin("*")
@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/{id}")
    Project getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id);
    }

    @GetMapping("/all")
    List<Project> getAllProject() {
        return projectService.getAllProject();
    }

    @GetMapping("/customer/{id}")
    List<Project> getProjectListByCustomerId(@PathVariable Long id){
        return projectService.getProjectListByCustomerId(id);
    }

    @PostMapping("")
    Project addProject(@RequestBody Project newProject) {
        return projectService.addProject(newProject);
    }

    @PutMapping("")
    Project updateProjectById(@RequestBody Project srcProject) {
        return projectService.updateProjectById(srcProject);
    }

    @DeleteMapping("/{id}")
    String deleteProjectById(@PathVariable Long id) {
        return projectService.deleteProjectById(id);
    }

    @DeleteMapping("/customer/{id}")
    String deleteProjectByCustomerId(@PathVariable Long id){
        return projectService.deleteProjectByCustomerId(id);
    }
}
