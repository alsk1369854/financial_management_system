import { AccountingItemInterface } from '../AccountingItemInterface';
import { CustomerInterface } from "../CustomerInterface";
import { Dayjs } from 'dayjs';

export interface ProjectInterface {
    [key: string]: any
    id: number | null,
    name: string,
    address: string,
    startDate: string | null,
    endDate: string | null,
    invoiceCreateDate: string | null,
    customer: CustomerInterface,
    accountingItemList: AccountingItemInterface[]
}