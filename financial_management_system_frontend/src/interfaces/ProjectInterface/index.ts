import { AccountingItemInterface } from '../AccountingItemInterface';
import { CustomerInterface } from "../CustomerInterface";
import { Dayjs } from 'dayjs';

export interface ProjectInterface {
    [key: string]: number | null | string | Date | Dayjs | CustomerInterface | AccountingItemInterface[]
    id: number | null,
    name: string,
    address: string,
    startDate: string | Date | Dayjs | null,
    endDate: string | Date | Dayjs | null,
    invoiceCreateDate: string | Date | Dayjs | null,
    paymentDeadlineDate: string | Date | Dayjs | null,
    customer: CustomerInterface,
    accountingItemList: AccountingItemInterface[]
}