import { CustomerInterface } from "../../../interfaces/CustomerInterface";

export interface CustomerTableDataType extends CustomerInterface {
    totalArrears: number;
}