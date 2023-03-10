import axios from 'axios'
import { CompanyInterface } from '../interfaces/CompanyInterface';
import { hostURL } from './APIConfig'

export const getAllCompany = () => {
    const url = hostURL + '/all-company';
    return axios.get<CompanyInterface[]>(url);
}