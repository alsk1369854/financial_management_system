import {
  AccountingItemInterface,
  AccountingPayTypeEnum,
} from "../../interfaces/AccountingItemInterface";
import { initProject } from "./ProjectModelUtil";

export const initAccountingItem: AccountingItemInterface = {
  title: "新項目",
  createDateTime: "",
  amount: 0,
  project: { ...initProject },
  payType: AccountingPayTypeEnum.cash,
  createDate: "",
  description: "",
};
