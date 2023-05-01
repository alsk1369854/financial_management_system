import { AccountingItemTypeEnum } from "../../../interfaces/AccountingItemInterface";
import { getAllCustomer } from "../../../services/CustomerService";
import { CustomerTableDataType } from "../interfaces";

export const asyncGetCustomerTableDataSource = async (
    callbackFunc: (tableDataSource: CustomerTableDataType[]) => void
): Promise<CustomerTableDataType[]> => {
    const { data: customerList } = await getAllCustomer();
    let tableDataSource: CustomerTableDataType[] = [];
    for (const customer of customerList) {
        let customerTotalArrears = 0;
        const { projectList } = customer;
        for (const project of projectList) {
            const { accountingItemList } = project;
            for (const accountingItem of accountingItemList) {
                const { amount, type } = accountingItem;
                switch (type) {
                    case AccountingItemTypeEnum.arrears:
                        customerTotalArrears -= amount;
                        break;
                    case AccountingItemTypeEnum.receive:
                        customerTotalArrears += amount;
                        break;
                }
            }
        }
        tableDataSource.push({
            ...customer,
            totalArrears: customerTotalArrears,
        })
    }
    callbackFunc(tableDataSource);
    return tableDataSource;
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