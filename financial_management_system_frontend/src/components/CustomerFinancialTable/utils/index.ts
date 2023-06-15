
import { CustomerInterface } from "../../../interfaces/CustomerInterface";
import { getAllCustomer } from "../../../services/CustomerService";
import { getProjectTotalArrears } from "../components/ProjectFinancialTable/utils";
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
        result += getProjectTotalArrears(project);
    }
    return result;
}


