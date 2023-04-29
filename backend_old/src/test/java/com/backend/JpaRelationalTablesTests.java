package com.backend;

import com.backend.model.Customer;
import com.backend.model.Project;
import com.backend.repository.CustomerRepository;
import com.backend.repository.ProjectBillingItemsRepository;
import com.backend.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
public class JpaRelationalTablesTests {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    ProjectBillingItemsRepository projectBillingItemsRepository;

    @Test
    void addProjectData(){
        // 1.建立
        Customer customer = new Customer();
        customer.setId(1L);
        customer.setName("test");

        Project project = new Project();
        project.setName("project 2");
        project.setCustomer(customer);

        projectRepository.save(project);
    }

    @Test
    @Transactional
    void readProjectData(){
        Optional<Project> person = projectRepository.findById(1L);
        System.out.println(person.get());
    }

}
