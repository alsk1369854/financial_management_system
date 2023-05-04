package com.ming.financial_management_system_backend.controller;

import com.ming.financial_management_system_backend.model.AccountingItem;
import com.ming.financial_management_system_backend.service.AccountingItemService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Tag(name = "Accounting item", description = "Accounting item APIs")
@CrossOrigin("*")
@RestController
@RequestMapping("/accounting-item")
public class AccountingItemController {
    @Autowired
    AccountingItemService accountingItemService;

    @GetMapping("/project/{id}")
    List<AccountingItem> getAccountingItemListByByProjectId(@PathVariable Long id){
        return accountingItemService.getAccountingItemListByByProjectId(id);
    }

    @PostMapping("")
    AccountingItem addAccountingItem(@RequestBody AccountingItem newAccountingItem){
        return accountingItemService.addAccountingItem(newAccountingItem);
    }

    @PutMapping("")
    AccountingItem updateAccountingItem(@RequestBody AccountingItem srcAccountingItem){
            return accountingItemService.updateAccountingItem(srcAccountingItem);
    }

    @DeleteMapping("/{id}")
    String deleteAccountingItemById(@PathVariable Long id){
        return accountingItemService.deleteAccountingItemById(id);
    }

}
