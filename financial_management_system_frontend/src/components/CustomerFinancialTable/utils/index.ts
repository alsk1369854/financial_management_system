import React from 'react'
import { CustomerInterface } from "../../../interfaces/CustomerInterface";
import { DownloadExcelDatasetInterface } from "../../../interfaces/DownloadUtilInterface";
import { getAllCustomer } from "../../../services/CustomerService";
import { downloadExcel } from "../../../utils/DownloadUtil";
import { getProjectTotalArrears } from "../components/ProjectFinancialTable/utils";
import { CustomerTableDataType } from "../interfaces";

export const asyncGetCustomerTableDataSource = async (
  callbackFunc: (tableDataSource: CustomerTableDataType[]) => void
): Promise<CustomerTableDataType[]> => {
  const { data: customerList } = await getAllCustomer();
  let tableDataSource: CustomerTableDataType[] = [];
  for (const customer of customerList) {
    tableDataSource.push({
      ...customer,
      totalArrears: getCustomerTotalArrears(customer),
    });
  }
  callbackFunc(tableDataSource);
  return tableDataSource;
};

export const getCustomerTotalArrears = (
  customer: CustomerInterface
): number => {
  let result = 0;
  const { projectList } = customer;
  for (const project of projectList) {
    result += getProjectTotalArrears(project);
  }
  return result;
};

export const getCustomerTableDataSource = () =>{

}

export const downloadExcelReport = (
  tableDataSource: CustomerTableDataType[]
) => {
  let downloadExcelDataset: DownloadExcelDatasetInterface = {
    ID: [],
    客戶名稱: [],
    統一編號: [],
    電話: [],
    傳真: [],
    欠款總額: [],
    專案數量: [],
    描述: [],
  };
  tableDataSource.forEach((tableData) => {
    const {
      id,
      name,
      unifiedBusinessNumber,
      telephoneNumber,
      faxNumber,
      description,
      totalArrears,
      projectList,
    } = tableData;
    downloadExcelDataset["ID"].push("" + id);
    downloadExcelDataset["客戶名稱"].push(name);
    downloadExcelDataset["統一編號"].push(unifiedBusinessNumber);
    downloadExcelDataset["電話"].push(telephoneNumber);
    downloadExcelDataset["傳真"].push(faxNumber);
    downloadExcelDataset["欠款總額"].push(
      `$${totalArrears}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
    downloadExcelDataset["專案數量"].push("" + projectList.length);
    downloadExcelDataset["描述"].push(description);
  });
  downloadExcel(downloadExcelDataset, "客戶帳務清單");
};
