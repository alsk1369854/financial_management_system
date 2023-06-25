import { CustomerInterface } from "../../../interfaces/CustomerInterface";
import { ErrorResponseInterface } from "../../../interfaces/ErrorResponseInterface";

export interface UseCustomerDataSourceInterface {
    dataSource: CustomerTableDataType[];
    setDataSource: React.Dispatch<React.SetStateAction<CustomerTableDataType[]>>;
    isLoading: boolean;
    error: ErrorResponseInterface | null;
    reload: () => void;
}


export interface CustomerTableDataType extends CustomerInterface {
    totalArrears: number;
}

