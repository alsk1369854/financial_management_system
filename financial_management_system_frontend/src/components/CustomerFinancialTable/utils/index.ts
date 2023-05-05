import { AccountingItemTypeEnum } from "../../../interfaces/AccountingItemInterface";
import { CustomerInterface } from "../../../interfaces/CustomerInterface";
import { getAllCustomer } from "../../../services/CustomerService";
import { CustomerTableDataType } from "../interfaces";

export const asyncGetCustomerTableDataSource = async (
    callbackFunc: (tableDataSource: CustomerTableDataType[]) => void
): Promise<CustomerTableDataType[]> => {
    const { data: customerList } = await getAllCustomer();
    let tableDataSource: CustomerTableDataType[] = [];
    for (const customer of customerList) {
        tableDataSource.push({
            ...customer,
            totalArrears: getCustomerTotalArrears(customer),
        })
    }
    callbackFunc(tableDataSource);
    return tableDataSource;
}

export const getCustomerTotalArrears = (
    customer: CustomerInterface
): number => {
    let result = 0;
    const { projectList } = customer;
    for (const project of projectList) {
        const { accountingItemList } = project;
        for (const accountingItem of accountingItemList) {
            const { amount, type } = accountingItem;
            switch (type) {
                case AccountingItemTypeEnum.arrears:
                    result -= amount;
                    break;
                case AccountingItemTypeEnum.receive:
                    result += amount;
                    break;
            }
        }
    }
    return result;
}

export const initCustomerTableDataType: CustomerTableDataType = {
    id: -1,
    name: '',
    unifiedBusinessNumber: '',
    telephoneNumber: '',
    faxNumber: '',
    description: '',
    projectList: [],
    totalArrears: 0
}