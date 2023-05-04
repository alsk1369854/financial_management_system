package com.ming.financial_management_system_backend.service;

import com.ming.financial_management_system_backend.exception.CustomerNotFoundException;
import com.ming.financial_management_system_backend.exception.ProjectNotFoundException;
import com.ming.financial_management_system_backend.model.Project;
import com.ming.financial_management_system_backend.repository.CustomerRepository;
import com.ming.financial_management_system_backend.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    AccountingItemService accountingItemService;


    public Project getProjectById(Long id) {
        if (id == null) {
            throw new ProjectNotFoundException(id);
        }
        return projectRepository.findById(id)
                .orElseThrow(() -> new ProjectNotFoundException(id));
    }


    public List<Project> getAllProject() {
        return projectRepository.findAll();
    }


    public List<Project> getProjectListByCustomerId(Long id) {
        if (id == null || !customerRepository.existsById(id)) {
            throw new CustomerNotFoundException(id);
        }
        return projectRepository.findAllByCustomerId(id);
    }


    public Project addProject(Project newProject) {
        newProject.setId(null);
        Long customerId = newProject.getCustomer().getId();
        if (customerId == null || !customerRepository.existsById(customerId)) {
            throw new CustomerNotFoundException(customerId);
        }
        return projectRepository.save(newProject);
    }


    public Project updateProjectById(Project srcProject) {
        Long projectId = srcProject.getId();
        if (projectId == null) {
            throw new ProjectNotFoundException(projectId);
        }
        return projectRepository.findById(projectId).map(project -> {
            project.setName(srcProject.getName());
            project.setAddress(srcProject.getAddress());
            project.setStartDate(srcProject.getStartDate());
            project.setEndDate(srcProject.getEndDate());
            project.setInvoiceCreateDate(srcProject.getInvoiceCreateDate());
            project.setPaymentDeadlineDate(srcProject.getPaymentDeadlineDate());
            project.setDescription(srcProject.getDescription());
            project.setAccountingItemList(srcProject.getAccountingItemList());
            return projectRepository.save(project);
        }).orElseThrow(() -> new ProjectNotFoundException(projectId));
    }


    @Transactional
    public String deleteProjectById(Long id) {
        if (id == null || !projectRepository.existsById(id)) {
            throw new ProjectNotFoundException(id);
        }
        accountingItemService.deleteAccountingByProjectId(id);
        projectRepository.deleteById(id);
        return "Project with id: " + id + " has been deleted success.";
    }

    @Transactional
    public String deleteProjectByCustomerId(Long id) {
        if (id == null || !customerRepository.existsById(id)) {
            throw new CustomerNotFoundException(id);
        }
        List<Project> projectListByCustomerId = getProjectListByCustomerId(id);
        for (Project project : projectListByCustomerId) {
            Long projectId = project.getId();
            accountingItemService.deleteAccountingByProjectId(projectId);
        }
        projectRepository.deleteAllByCustomerId(id);
        return "Project with customer id: " + id + " has been deleted success.";
    }
}
