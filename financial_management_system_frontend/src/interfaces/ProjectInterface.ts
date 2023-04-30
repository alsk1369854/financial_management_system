import { CustomerInterface } from "./CustomerInterface";

export interface ProjectInterface {
    id: number,
    name: string,
    address: string,
    startDate: Date,
    endDate: Date,
    invoiceCreateDate: Date,
    paymentDeadlineDate: Date,
    description: string,
    customer: CustomerInterface
}