package com.backend.exception;

public class CompanyNotFoundException extends RuntimeException {
    public CompanyNotFoundException(Long id){
        super("Could not found the company with id: " + id);
    }
}
