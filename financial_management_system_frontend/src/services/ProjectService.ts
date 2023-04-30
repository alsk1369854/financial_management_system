import axios, { AxiosResponse } from 'axios'
import { hostURL } from './APIConfig'
import { ProjectInterface } from '../interfaces/ProjectInterface';

export const getProjectByCustomerId = (
    customerId: number
): Promise<AxiosResponse<ProjectInterface[], any>> => {
    const url = hostURL + `/project/customer/${customerId}`;
    return axios.get<ProjectInterface[]>(url);
} 