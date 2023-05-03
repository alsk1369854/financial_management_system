package com.ming.financial_management_system_backend.controller;

import com.ming.financial_management_system_backend.exception.CustomerNotFoundException;
import com.ming.financial_management_system_backend.model.Customer;
import com.ming.financial_management_system_backend.repository.CustomerRepository;
import com.ming.financial_management_system_backend.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@Tag(name = "Customer", description = "Customer APIs")
@CrossOrigin("*")
@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @GetMapping("/{id}")
    Customer getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    @GetMapping("/all")
    List<Customer> getAllCustomer() {
        return customerService.getAllCustomer();
    }

    @PostMapping("")
    Customer addCustomer(@RequestBody Customer newCustomer) {
        return customerService.addCustomer(newCustomer);
    }

    @PutMapping("")
    Customer updateCustomerById(@RequestBody Customer srcCustomer) {
        return customerService.updateCustomerById(srcCustomer);
    }

    @DeleteMapping("/{id}")
    String deleteCustomerById(@PathVariable Long id) {
        return customerService.deleteCustomerById(id);
    }
}
