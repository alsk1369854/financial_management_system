import axios, { AxiosResponse } from 'axios'
import { CompanyInterface } from '../interfaces/CompanyInterface';
import { hostURL } from './APIConfig'

export const getAllCompany = (): Promise<AxiosResponse<CompanyInterface[], any>> => {
    const url = hostURL + '/all-company';
    return axios.get<CompanyInterface[]>(url);
}

export const companyNameExists = (companyName: string): Promise<AxiosResponse<Boolean, any>> => {
    const url = hostURL + '/company-name-exists/' + companyName;
    return axios.get<Boolean>(url);
}