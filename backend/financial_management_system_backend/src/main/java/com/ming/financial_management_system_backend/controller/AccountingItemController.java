package com.ming.financial_management_system_backend.controller;

import com.ming.financial_management_system_backend.exception.AccountingItemException;
import com.ming.financial_management_system_backend.exception.ProjectNotFoundException;
import com.ming.financial_management_system_backend.model.AccountingItem;
import com.ming.financial_management_system_backend.repository.AccountingItemRepository;
import com.ming.financial_management_system_backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@CrossOrigin("*")
@RequestMapping("/accounting-item")
public class AccountingItemController {
    @Autowired
    AccountingItemRepository accountingItemRepository;

    @Autowired
    ProjectRepository projectRepository;


    @PostMapping("")
    AccountingItem newAccountingItem(@RequestBody AccountingItem newAccountingItem){
        newAccountingItem.setCreateDateTime(new Date());
        return accountingItemRepository.save(newAccountingItem);
    }

    @PutMapping("/{id}")
    AccountingItem updateAccountingItem(@RequestBody AccountingItem newAccountingItem, @PathVariable Long id){
            return accountingItemRepository.findById(id).map(accountingItem -> {
                accountingItem.setTitle(newAccountingItem.getTitle());
                accountingItem.setType(newAccountingItem.getType());
                accountingItem.setAmount(newAccountingItem.getAmount());
                accountingItem.setAmount(newAccountingItem.getPaymentType());
                accountingItem.setDescription(newAccountingItem.getDescription());
                Long projectId = newAccountingItem.getProject().getId();
                accountingItem.setProject(projectRepository.findById(projectId)
                        .orElseThrow(()-> new ProjectNotFoundException(projectId)));
                return accountingItemRepository.save(accountingItem);
            }).orElseThrow(()-> new AccountingItemException(id));
    }

    @DeleteMapping("/{id}")
    String deleteAccountingItemById(@PathVariable Long id){
        if(!accountingItemRepository.existsById(id)){
            throw new AccountingItemException(id);
        }
        accountingItemRepository.deleteById(id);
        return "Accounting item with id : " + id + " has been deleted success.";
    }


}
