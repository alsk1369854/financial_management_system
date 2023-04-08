package com.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "project_billing_items")
@Data
public class ProjectBillingItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "unit")
    private String unit;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "unit_price")
    private Integer unitPrice;

    @Column(name = "amount")
    private Integer amount;


    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "project_id")
    private Project project_id;

}
