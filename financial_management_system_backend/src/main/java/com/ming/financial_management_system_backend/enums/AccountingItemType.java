package com.ming.financial_management_system_backend.enums;

public enum AccountingItemType {
    arrears("arrears"),
    receive("receive");

    private String name;
    private AccountingItemType(String name){
        this.name = name;
    }

    public String getName(){
        return this.name;
    }
}
