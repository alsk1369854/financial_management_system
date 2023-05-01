import axios, { AxiosResponse } from 'axios'
import APIConfig from '../configs/APIConfig'
import { ProjectInterface } from '../interfaces/ProjectInterface';

const BASE_URL = APIConfig.HOST_URL + "/project";

export const getProjectByCustomerId = (
    customerId: number
): Promise<AxiosResponse<ProjectInterface[], any>> => {
    const url = BASE_URL + `/customer/${customerId}`;
    return axios.get<ProjectInterface[]>(url);
}

export const deleteProjectById = (
    projectId: number
): Promise<AxiosResponse<string, any>> => {
    const url = BASE_URL + `/${projectId}}`;
    return axios.delete<string>(url);
}