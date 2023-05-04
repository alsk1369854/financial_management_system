import { ProjectInterface } from "../ProjectInterface";

export interface AccountingItemInterface {
    id: number,
    title: string,
    type: AccountingItemTypeEnum,
    createDateTime: Date | string,
    amount: number,
    project: ProjectInterface
}

export enum AccountingItemTypeEnum {
    arrears = "arrears",
    receive = "receive"
}

export enum AccountingItemTypeEnumViewText {
    arrears = "欠款",
    receive = "收款"
}