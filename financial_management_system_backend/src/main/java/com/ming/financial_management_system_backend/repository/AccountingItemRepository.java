package com.ming.financial_management_system_backend.repository;

import com.ming.financial_management_system_backend.model.AccountingItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountingItemRepository extends JpaRepository<AccountingItem, Long> {

    public List<AccountingItem> findAllByProjectId(Long id);

    public void deleteAllByProjectId(Long id);
}
