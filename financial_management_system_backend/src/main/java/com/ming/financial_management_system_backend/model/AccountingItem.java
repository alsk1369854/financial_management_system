package com.ming.financial_management_system_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.ming.financial_management_system_backend.enums.AccountingPayType;
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

    @Column(name = "create_date", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createDate;

    @Column(name = "pay_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private AccountingPayType payType;

    @Column(name = "amount", nullable = false)
    private Integer amount;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "project_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "PROJECT_ID_FK")
    )
    @JsonBackReference
    private Project project;
}
