package com.ming.financial_management_system_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ming.financial_management_system_backend.enums.AccountingItemType;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "accounting_item")
@Data
public class AccountingItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private AccountingItemType type;

    @Column(name = "create_date_time", nullable = false)
    private Date createDateTime;

    @Column(name = "amount", nullable = false)
    private Integer amount;

    @Column(name = "payment_type")
    private String paymentType;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "project_id",
            foreignKey = @ForeignKey(name = "PROJECT_ID_FK") // 添加外鍵約束，防止外鍵指向不存在的主鍵
    )
    @JsonBackReference
    private Project project;

}
