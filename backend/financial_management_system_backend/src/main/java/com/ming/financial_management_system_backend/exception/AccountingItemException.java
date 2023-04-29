package com.ming.financial_management_system_backend.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.NOT_FOUND, reason="Not Found") //404
public class AccountingItemException extends RuntimeException{
    public AccountingItemException(Long id){
        super("Could not found this accounting item with id: " + id);
    }
}
