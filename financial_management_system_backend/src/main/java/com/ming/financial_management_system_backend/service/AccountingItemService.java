package com.ming.financial_management_system_backend.service;

import com.ming.financial_management_system_backend.exception.AccountingItemNotFoundException;
import com.ming.financial_management_system_backend.exception.ProjectNotFoundException;
import com.ming.financial_management_system_backend.model.AccountingItem;
import com.ming.financial_management_system_backend.repository.AccountingItemRepository;
import com.ming.financial_management_system_backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AccountingItemService {

    @Autowired
    AccountingItemRepository accountingItemRepository;

    @Autowired
    ProjectRepository projectRepository;


    public List<AccountingItem> getAccountingItemListByByProjectId(Long id) {
        if (id == null || !projectRepository.existsById(id)) {
            throw new ProjectNotFoundException(id);
        }
        return accountingItemRepository.findAllByProjectId(id);
    }

    public AccountingItem addAccountingItem(AccountingItem newAccountingItem) {
        newAccountingItem.setId(null);
        Long projectId = newAccountingItem.getProject().getId();
        if(projectId == null || !projectRepository.existsById(projectId)){
            throw new ProjectNotFoundException(projectId);
        }
        return accountingItemRepository.save(newAccountingItem);
    }

    public AccountingItem updateAccountingItem(AccountingItem srcAccountingItem) {
        Long accountingItemId = srcAccountingItem.getId();
        if (accountingItemId == null) {
            throw new AccountingItemNotFoundException(accountingItemId);
        }
        return accountingItemRepository.findById(accountingItemId).map(accountingItem -> {
            accountingItem.setTitle(srcAccountingItem.getTitle());
            accountingItem.setType(srcAccountingItem.getType());
            accountingItem.setAmount(srcAccountingItem.getAmount());
            accountingItem.setCreateDate(srcAccountingItem.getCreateDate());
            accountingItem.setDescription(srcAccountingItem.getDescription());
            return accountingItemRepository.save(accountingItem);
        }).orElseThrow(() -> new AccountingItemNotFoundException(accountingItemId));
    }

    public String deleteAccountingItemById(Long id) {
        if (id == null || !accountingItemRepository.existsById(id)) {
            throw new AccountingItemNotFoundException(id);
        }
        accountingItemRepository.deleteById(id);
        return "Accounting item with id: " + id + " has been deleted success.";
    }

    public String deleteAccountingByProjectId(Long id){
        if(id == null || !projectRepository.existsById(id)){
            throw new ProjectNotFoundException(id);
        }
        accountingItemRepository.deleteAllByProjectId(id);
        return "Accounting item with project id: " + id + " has been deleted success.";
    }

}
