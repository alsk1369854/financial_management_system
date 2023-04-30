import axios, { AxiosResponse } from 'axios'
import { hostURL } from './APIConfig'
import { AccountingItemInterface } from '../interfaces/AccountingItemInterface'

const baseURL = hostURL + "/accounting-item"

export const getAccountingItemByProjectId = (
    projectId: number
): Promise<AxiosResponse<AccountingItemInterface[], any>> => {
    const url = baseURL + `/project/${projectId}`;
    return axios.get<AccountingItemInterface[]>(url);
}