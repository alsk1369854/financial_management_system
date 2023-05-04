package com.ming.financial_management_system_backend.service;


import com.ming.financial_management_system_backend.exception.CustomerNotFoundException;
import com.ming.financial_management_system_backend.model.Customer;
import com.ming.financial_management_system_backend.repository.CustomerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    ProjectService projectService;

    public Customer getCustomerById(Long id) {
        if(id == null){
            throw new CustomerNotFoundException(id);
        }
        return customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException(id));
    }

    public List<Customer> getAllCustomer() {
        return customerRepository.findAll();
    }

    public Customer addCustomer(Customer newCustomer) {
        newCustomer.setId(null);
        return customerRepository.save(newCustomer);
    }

    public Customer updateCustomerById(Customer srcCustomer) {
        Long customerId = srcCustomer.getId();
        if(customerId == null){
            throw new CustomerNotFoundException(customerId);
        }
        return customerRepository.findById(customerId)
                .map(customer -> {
                    customer.setName(srcCustomer.getName());
                    customer.setUnifiedBusinessNumber(srcCustomer.getUnifiedBusinessNumber());
                    customer.setTelephoneNumber(srcCustomer.getTelephoneNumber());
                    customer.setFaxNumber(srcCustomer.getFaxNumber());
                    customer.setDescription(srcCustomer.getDescription());
                    customer.setProjectList(srcCustomer.getProjectList());
                    return customerRepository.save(customer);
                }).orElseThrow(() -> new CustomerNotFoundException(customerId));
    }

    @Transactional
    public String deleteCustomerById(Long id) {
        if (id == null || !customerRepository.existsById(id)) {
            throw new CustomerNotFoundException(id);
        }
        projectService.deleteProjectByCustomerId(id);
        customerRepository.deleteById(id);
        return "Customer with id: " + id + " has been deleted success.";
    }
}
