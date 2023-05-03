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