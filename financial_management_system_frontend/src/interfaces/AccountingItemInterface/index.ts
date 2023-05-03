import { ProjectInterface } from "../ProjectInterface";

export interface AccountingItemInterface {
    id: number,
    title: string,
    type: AccountingItemTypeEnum,
    createDateTime: Date,
    amount: number,
    paymentType: string,
    description: string,
    project: ProjectInterface
}

export enum AccountingItemTypeEnum {
    arrears = "arrears",
    receive = "receive"
}

export enum AccountingItemTypeEnumViewText_ZH_TW {
    arrears = "欠款",
    receive = "收款"
}