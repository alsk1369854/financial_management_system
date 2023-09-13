import { AccountingItemInterface } from "../AccountingItemInterface";
import { CustomerInterface } from "../CustomerInterface";
import { Dayjs } from "dayjs";

export interface ProjectInterface {
  id: number | null;
  name: string;
  address: string;
  startDate: string | null;
  endDate: string | null;
  invoiceCreateDate: string | null;
  description: string;
  customer: CustomerInterface;
  accountingItemList: AccountingItemInterface[];
}
