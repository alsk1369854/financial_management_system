package com.ming.financial_management_system_backend.repository;

import com.ming.financial_management_system_backend.model.AccountingItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountingItemRepository extends JpaRepository<AccountingItem, Long> {
}
