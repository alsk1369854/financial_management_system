package com.backend.controller;

import com.backend.exception.CompanyNotFoundException;
import com.backend.model.Company;
import com.backend.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.ExampleMatcher;
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

//    @GetMapping("/company-name-exists/{name}")
//    Boolean companyNameExists(@PathVariable String name){
//        ExampleMatcher caseInsensitiveExampleMatcher = ExampleMatcher.matchingAll().withIgnoreCase();
////        return companyRepository.r;
//    }

    @PutMapping("/company/{id}")
    Company updateCompany(@RequestBody Company newCompany, @PathVariable Long id){
        return companyRepository.findById(id)
                .map(company ->{
                    company.setName(newCompany.getName());
                    company.setArrears(newCompany.getArrears());
                    company.setRemark(newCompany.getRemark());
                    return companyRepository.save(company);
                }).orElseThrow(() -> new CompanyNotFoundException(id));

    }

    @DeleteMapping("/company/{id}")
    String deleteCompany(@PathVariable Long id){
        if(!companyRepository.existsById(id)){
            throw new CompanyNotFoundException(id);
        }
        companyRepository.deleteById(id);
        return "Company with id: " + id + " has been deleted success.";
    }

}
