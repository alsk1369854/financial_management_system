package com.ming.financial_management_system_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "project")
@Data
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "total_amount")
    private Integer totalAmount;

    @Column(name = "start_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date startDate;

    @Column(name = "end_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date endDate;

    @Column(name = "invoice_create_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date invoiceCreateDate;

    @Column(name = "description")
    private String description;

    //    @EqualsAndHashCode.Exclude
    @OneToMany(
            cascade = CascadeType.ALL,
            mappedBy = "project")
    @JsonManagedReference
    private List<AccountingItem> accountingItemList = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "customer_id",
            foreignKey = @ForeignKey(name = "CUSTOMER_ID_FK") // 添加外鍵約束，防止外鍵指向不存在的主鍵
    )
    @JsonBackReference
    private Customer customer;

}
