import axios, { AxiosResponse } from 'axios'
import APIConfig from '../../configs/APIConfig'
import { ProjectInterface } from '../../interfaces/ProjectInterface';
import { generalProject } from '../../utils/ModelUtil';

const BASE_URL = APIConfig.HOST_URL + "/project";

export const getProjectByCustomerId = (
    customerId: number
): Promise<AxiosResponse<ProjectInterface[]>> => {
    const url = BASE_URL + `/customer/${customerId}`;
    return axios.get<ProjectInterface[]>(url);
}

export const deleteProjectById = (
    projectId: number
): Promise<AxiosResponse<string>> => {
    const url = BASE_URL + `/${projectId}`;

    return axios.delete<string>(url);
}

export const addProject = (
    project: ProjectInterface
): Promise<AxiosResponse<ProjectInterface>> => {
    const url = BASE_URL;
    project = generalProject(project);
    return axios.post<ProjectInterface>(url, project, APIConfig.JSON_CONTENT_TYPE_CONFIG);
}


export const updateProjectById = (
    srcProject: ProjectInterface
): Promise<AxiosResponse<ProjectInterface>> => {
    const url = BASE_URL;
    srcProject = generalProject(srcProject);
    return axios.put<ProjectInterface>(url, srcProject, APIConfig.JSON_CONTENT_TYPE_CONFIG);
}