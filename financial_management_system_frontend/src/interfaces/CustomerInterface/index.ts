import { ProjectInterface } from "../ProjectInterface";

export interface CustomerInterface {
    id: number | null,
    name: string,
    unifiedBusinessNumber: string,
    telephoneNumber: string,
    faxNumber: string,
    description: string,
    projectList: ProjectInterface[]
}