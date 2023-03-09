package com.backend.controller;

import com.backend.exception.CompanyNotFoundException;
import com.backend.model.Company;
import com.backend.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class CompanyController {


    @Autowired
    private CompanyRepository companyRepository;

    @PostMapping("/company")
    Company newCompany(@RequestBody Company newCompany){
        return companyRepository.save(newCompany);
    }

    @GetMapping("/all-company")
    List<Company> getAllCompany(){
        return companyRepository.findAll();
    }

    @GetMapping("/company/{id}")
    Company getCompanyById(@PathVariable Long id){
        return companyRepository.findById(id)
                .orElseThrow(()-> new CompanyNotFoundException(id));
    }
}
