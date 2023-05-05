import { Moment } from 'moment';
import { AccountingItemInterface } from '../AccountingItemInterface';
import { CustomerInterface } from "../CustomerInterface";

export interface ProjectInterface {
    [key: string]: number | null | string | Date | Moment | CustomerInterface | AccountingItemInterface[]
    id: number | null,
    name: string,
    address: string,
    startDate: Date | string | Moment,
    endDate: Date | string | Moment,
    invoiceCreateDate: Date | string | Moment,
    paymentDeadlineDate: Date | string | Moment,
    description: string,
    customer: CustomerInterface,
    accountingItemList: AccountingItemInterface[]
}