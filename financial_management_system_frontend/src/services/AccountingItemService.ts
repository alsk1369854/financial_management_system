import axios, { AxiosResponse } from 'axios'
import APIConfig from '../configs/APIConfig'
import { AccountingItemInterface } from '../interfaces/AccountingItemInterface'

const BASE_URL = APIConfig.HOST_URL + "/accounting-item"

export const getAccountingItemByProjectId = (
    projectId: number
): Promise<AxiosResponse<AccountingItemInterface[], any>> => {
    const url = BASE_URL + `/project/${projectId}`;
    return axios.get<AccountingItemInterface[]>(url);
}