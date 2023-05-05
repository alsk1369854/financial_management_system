import { ProjectTableDataType } from './../interfaces/index';
import { AccountingItemTypeEnum } from "../../../../../interfaces/AccountingItemInterface";
import { ProjectInterface } from "../../../../../interfaces/ProjectInterface";
import { initCustomer, projectDateToMomentJs } from '../../../../../utils/ModelUtil';

export const getProjectTableDataSource = (
    projectList: ProjectInterface[]
): ProjectTableDataType[] => {
    return projectList.map((project) => {
        project = projectDateToMomentJs(project);
        return {
            ...project,
            totalArrears: getProjectTotalArrears(project)
        };
    })
}

const getProjectTotalArrears = (
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

export const initProjectTableDataType: ProjectTableDataType = {
    id: -1,
    totalArrears: 0,
    name: '',
    address: '',
    startDate: new Date(),
    endDate: new Date(),
    invoiceCreateDate: new Date(),
    paymentDeadlineDate: new Date(),
    description: '',
    customer: { ...initCustomer },
    accountingItemList: []
}