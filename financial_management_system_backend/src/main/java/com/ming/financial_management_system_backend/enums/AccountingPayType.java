package com.ming.financial_management_system_backend.enums;

public enum AccountingPayType {
    cash("cash"),
    bank("bank");

    private String name;
    private AccountingPayType(String name){
        this.name = name;
    }

    public String getName(){
        return this.name;
    }
}
