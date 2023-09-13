import { ProjectTableDataType } from "./../interfaces/index";
// import { AccountingItemTypeEnum } from "../../../../../interfaces/AccountingItemInterface";
import { ProjectInterface } from "../../../../../interfaces/ProjectInterface";
import { initCustomer } from "../../../../../utils/ModelUtil";
import dayjs from "dayjs";

export const getProjectTableDataSource = (
  projectList: ProjectInterface[],
  customerId: number
): ProjectTableDataType[] => {
  return projectList.map((project) => {
    return {
      ...project,
      endDate: dayjs(project.endDate),
      startDate: dayjs(project.startDate),
      customer: { ...initCustomer, id: customerId },
      totalArrears: getProjectTotalArrears(project),
    };
  });
};

export const getProjectTotalArrears = (project: ProjectInterface): number => {
  return project.accountingItemList.reduce((pre, accountingItem) => {
    const { amount } = accountingItem;
    return (pre += amount);
  }, 0);
};
