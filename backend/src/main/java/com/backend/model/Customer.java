package com.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name="customer")
@Data
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name",  nullable = false) // 公司名稱
    private String name;

    @Column(name = "address") // 公司地址
    private String address;

    @Column(name = "tax_identification_number") // 統一編號
    private String taxIdentificationNumber;

    @Column(name = "telephone_number") // 室內電話號碼
    private String telephoneNumber;

    @Column(name = "fax_number")
    private String faxNumber;

    @Column(name = "phone_number") // 手機電話號碼
    private String phoneNumber;

    @Column(name = "description") // 公司描述
    private String description;

    /**
     *  一對多
     *  fetch 預設為 FetchType.LAZY (延遲加載)
     */
    @OneToMany
    @JoinColumn(name = "customer_id") // 此列會建立在關聯目標的身上
    private List<Project> projects;
}
