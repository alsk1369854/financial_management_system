package com.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "company")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "arrears", nullable = false)
    private Integer arrears;

    @Column(name = "remark")
    private String remark;

    public Company() {
    }

    public Company(String name, Integer arrears, String remark) {
        this.name = name;
        this.arrears = arrears;
        this.remark = remark;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getArrears() {
        return arrears;
    }

    public void setArrears(Integer arrears) {
        this.arrears = arrears;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public String toString() {
        return "Company{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", arrears=" + arrears +
                ", remark='" + remark + '\'' +
                '}' + "\n";
    }
}
