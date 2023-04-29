package com.ming.financial_management_system_backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "customer")
@Data
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "unified_business_number")
    private String unifiedBusinessNumber;

    @Column(name = "telephone_number")
    private String telephoneNumber;

    @Column(name = "fax_number")
    private String faxNumber;

    @Column(name = "description")
    private String description;

}
