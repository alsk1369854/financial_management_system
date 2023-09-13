import { CustomerInterface } from "../../../interfaces/CustomerInterface";
import { ErrorResponseInterface } from "../../../interfaces/ErrorResponseInterface";
import { TotalArrearsInterface } from "../../../interfaces/Global";

export interface UseCustomerDataSourceInterface {
  customerDataSource: CustomerTableDataType[];
  setCustomerDataSource: React.Dispatch<
    React.SetStateAction<CustomerTableDataType[]>
  >;
  isLoadingCustomerDataSource: boolean;
  errorOfCustomerDataSource: ErrorResponseInterface | null;
  reloadCustomerDataSource: () => void;
}

export interface CustomerTableDataType
  extends CustomerInterface,
    TotalArrearsInterface {}
