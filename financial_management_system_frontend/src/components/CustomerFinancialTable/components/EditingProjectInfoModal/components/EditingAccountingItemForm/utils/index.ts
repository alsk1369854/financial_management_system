import { DefaultOptionType } from "antd/es/select";
import { AccountingItemTypeEnum, AccountingItemTypeEnumViewText } from "../../../../../../../interfaces/AccountingItemInterface";

export const accountingItemTypeSelectOptions: DefaultOptionType[] = [
    { value: AccountingItemTypeEnum.arrears, label: AccountingItemTypeEnumViewText[AccountingItemTypeEnum.arrears] },
    { value: AccountingItemTypeEnum.receive, label: AccountingItemTypeEnumViewText[AccountingItemTypeEnum.receive] },
]