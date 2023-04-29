package com.ming.financial_management_system_backend.repository;

import com.ming.financial_management_system_backend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
