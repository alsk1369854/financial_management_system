import { AccountingItemInterface, AccountingItemTypeEnum } from "../../interfaces/AccountingItemInterface";
import { CustomerInterface } from "../../interfaces/CustomerInterface";
import { ProjectInterface } from "../../interfaces/ProjectInterface";

export const initCustomer: CustomerInterface = {
    id: -1,
    name: "",
    unifiedBusinessNumber: "",
    telephoneNumber: "",
    faxNumber: "",
    description: "",
    projectList: []
}

export const initProject: ProjectInterface = {
    id: -1,
    name: "",
    address: "",
    startDate: "",
    endDate: "",
    invoiceCreateDate: "",
    paymentDeadlineDate: "",
    description: "",
    customer: { ...initCustomer },
    accountingItemList: []
}

export const initAccountingItem: AccountingItemInterface = {
    id: -1,
    title: "新項目",
    type: AccountingItemTypeEnum.receive,
    createDateTime: "",
    amount: 0,
    project: initProject
}