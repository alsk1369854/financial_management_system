package com.ming.financial_management_system_backend.controller;

import com.ming.financial_management_system_backend.exception.CustomerNotFoundException;
import com.ming.financial_management_system_backend.model.Customer;
import com.ming.financial_management_system_backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    CustomerRepository customerRepository;

    @GetMapping("/{id}")
    Customer getCustomerById(@PathVariable Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException(id));
    }

    @GetMapping("/all")
    List<Customer> getAllCustomer() {
        return customerRepository.findAll();
    }

    @PostMapping("")
    Customer addCustomer(@RequestBody Customer newCustomer) {
        return customerRepository.save(newCustomer);
    }

    @PutMapping("/{id}")
    Customer updateCustomerById(@RequestBody Customer newCustomer, @PathVariable Long id) {
        return customerRepository.findById(id)
                .map(customer -> {
                    customer.setName(newCustomer.getName());
                    customer.setUnifiedBusinessNumber(newCustomer.getUnifiedBusinessNumber());
                    customer.setTelephoneNumber(newCustomer.getTelephoneNumber());
                    customer.setFaxNumber(newCustomer.getFaxNumber());
                    customer.setDescription(newCustomer.getDescription());
                    return customerRepository.save(customer);
                }).orElseThrow(() -> new CustomerNotFoundException(id));
    }

    @DeleteMapping("/{id}")
    String deleteCustomerById(@PathVariable Long id) {
        if (!customerRepository.existsById(id)) {
            throw new CustomerNotFoundException(id);
        }
        customerRepository.deleteById(id);
        return "Customer with id : " + id + " has been deleted success.";
    }
}
