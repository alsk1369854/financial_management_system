import { AccountingItemInterface, AccountingItemTypeEnum } from "../../interfaces/AccountingItemInterface";
import { initProject } from "./ProjectModelUtil";

export const initAccountingItem: AccountingItemInterface = {
    id: null,
    title: "新項目",
    type: AccountingItemTypeEnum.receive,
    createDateTime: "",
    amount: 0,
    project: { ...initProject }
}