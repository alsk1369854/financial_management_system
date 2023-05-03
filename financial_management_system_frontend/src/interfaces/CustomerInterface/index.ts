import { ProjectInterface } from "../ProjectInterface";

export interface CustomerInterface {
    id: number,
    name: string,
    unifiedBusinessNumber: string,
    telephoneNumber: string,
    faxNumber: string,
    description: string,
    projectList: ProjectInterface[]
}