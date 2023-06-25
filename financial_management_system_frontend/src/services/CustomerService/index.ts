import axios, { AxiosResponse } from 'axios'
import APIConfig from '../../configs/APIConfig'
import { CustomerInterface } from '../../interfaces/CustomerInterface';
import { ErrorResponseInterface } from '../../interfaces/ErrorResponseInterface';

const BASE_URL = APIConfig.HOST_URL + '/customer';


export const getAllCustomer = (): Promise<AxiosResponse<CustomerInterface[]>> => {
    const url = BASE_URL + '/all';
    return axios.get<CustomerInterface[]>(url);
}

export const updateCustomer = (
    srcCustomer: CustomerInterface
): Promise<AxiosResponse<CustomerInterface>> => {
    const url = BASE_URL;
    return axios.put<CustomerInterface>(url, srcCustomer, APIConfig.JSON_CONTENT_TYPE_CONFIG);
}

export const addCustomer = (
    newCustomer: CustomerInterface
): Promise<AxiosResponse<CustomerInterface>> => {
    const url = BASE_URL;
    return axios.post<CustomerInterface>(url, newCustomer, APIConfig.JSON_CONTENT_TYPE_CONFIG);
}

export const deleteCustomerById = (
    customerId: number
): Promise<AxiosResponse<string>> => {
    const url = BASE_URL + `/${customerId}`;
    return axios.delete<string>(url);
}