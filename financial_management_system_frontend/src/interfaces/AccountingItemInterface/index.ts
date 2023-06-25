import { ProjectInterface } from './../ProjectInterface/index';
import { Dayjs } from "dayjs";

export interface AccountingItemInterface {
    [key: string]: any,
    id?: number,
    payType: AccountingPayTypeEnum,
    createDate: string,
    amount: number,
    description: string,
    ProjectInterface?: ProjectInterface,
}

export enum AccountingPayTypeEnum {
    cash = "cash",
    bank = "bank"
}

export enum AccountingPayTypeEnumViewText {
    cash = "現金",
    bank = "銀行"
}