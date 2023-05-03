import { AccountingItemInterface } from '../AccountingItemInterface';
import { CustomerInterface } from "../CustomerInterface";

export interface ProjectInterface {
    id: number,
    name: string,
    address: string,
    startDate: Date | string,
    endDate: Date | string,
    invoiceCreateDate: Date | string,
    paymentDeadlineDate: Date | string,
    description: string,
    customer: CustomerInterface,
    accountingItemList: AccountingItemInterface[]
}