import axios, { AxiosResponse } from 'axios'
import { hostURL } from './APIConfig'
import { CustomerInterface } from '../interfaces/CustomerInterface';

const baseURL = hostURL + '/customer';

const jsonContentTypeConfig = {
    headers: {
        // Authorization: `Bearer ${localStorage.getItem("access_token")}`
        "Content-Type": "application/json"
    }
}

export const getAllCustomer = (): Promise<AxiosResponse<CustomerInterface[], any>> => {
    const url = baseURL + '/all';
    return axios.get<CustomerInterface[]>(url);
}

export const updateCustomer = (
    srcCustomer: CustomerInterface
): Promise<AxiosResponse<CustomerInterface, any>> => {
    const url = baseURL;
    return axios.put(url, srcCustomer, jsonContentTypeConfig);
}