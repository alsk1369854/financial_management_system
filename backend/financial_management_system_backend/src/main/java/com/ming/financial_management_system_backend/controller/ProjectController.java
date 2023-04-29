package com.ming.financial_management_system_backend.controller;

import com.ming.financial_management_system_backend.exception.CustomerNotFoundException;
import com.ming.financial_management_system_backend.exception.ProjectNotFoundException;
import com.ming.financial_management_system_backend.model.Customer;
import com.ming.financial_management_system_backend.model.Project;
import com.ming.financial_management_system_backend.repository.CustomerRepository;
import com.ming.financial_management_system_backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/{id}")
    Project getProjectById(@PathVariable Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ProjectNotFoundException(id));
    }

    @GetMapping("/all")
    List<Project> getAllProject(){
        return projectRepository.findAll();
    }

    @PostMapping("")
    Project addProject(@RequestBody Project newProject) {
        Long customerId = newProject.getCustomer().getId();
        if(!customerRepository.existsById(customerId)){
            throw new CustomerNotFoundException(customerId);
        }
        return projectRepository.save(newProject);
    }

    @PutMapping("/{id}")
    Project updateProjectById(@RequestBody Project newProject, @PathVariable Long id) {
        return projectRepository.findById(id).map(project -> {
            project.setName(newProject.getName());
            project.setAddress(newProject.getAddress());
            project.setStartDate(newProject.getStartDate());
            project.setEndDate(newProject.getEndDate());
            project.setInvoiceCreateDate(newProject.getInvoiceCreateDate());
            project.setPaymentDeadlineDate(newProject.getPaymentDeadlineDate());
            project.setDescription(newProject.getDescription());
            Long customerId = newProject.getCustomer().getId();
            project.setCustomer(customerRepository.findById(customerId)
                    .orElseThrow(()-> new CustomerNotFoundException(customerId)));
            return projectRepository.save(project);
        }).orElseThrow(() -> new ProjectNotFoundException(id));
    }

    @DeleteMapping("/{id}")
    String dataProjectById(@PathVariable Long id) {
        if (!projectRepository.existsById(id)){
            throw new ProjectNotFoundException(id);
        }
        projectRepository.deleteById(id);
        return "Project with id : " + id + " has been deleted success.";
    }
}
