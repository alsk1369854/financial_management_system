import { Dayjs } from "dayjs";
import { ProjectInterface } from "../ProjectInterface";

export interface AccountingItemInterface {
    id: number | null,
    title: string,
    type: AccountingItemTypeEnum,
    createDateTime: string | Date | Dayjs | null ,
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