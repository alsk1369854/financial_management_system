import { ProjectTableDataType } from './../interfaces/index';
import { AccountingItemTypeEnum } from "../../../../../interfaces/AccountingItemInterface";
import { ProjectInterface } from "../../../../../interfaces/ProjectInterface";
import { initCustomer, projectDateToDayjs } from '../../../../../utils/ModelUtil';

export const getProjectTableDataSource = (
    projectList: ProjectInterface[],
    customerId: number
): ProjectTableDataType[] => {
    return projectList.map((project) => {
        project = projectDateToDayjs(project);
        return {
            ...project,
            customer: { ...initCustomer, id: customerId },
            totalArrears: getProjectTotalArrears(project)
        };
    })
}

export const getProjectTotalArrears = (
    project: ProjectInterface
): number => {
    return project.accountingItemList.reduce((pre, curr) => {
        const { type, amount } = curr;
        let result = pre;
        switch (type) {
            case AccountingItemTypeEnum.arrears:
                result -= amount;
                break;
            case AccountingItemTypeEnum.receive:
                result += amount;
                break;
        }
        return result;
    }, 0)
}

