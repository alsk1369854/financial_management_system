import ExcelJs, { TableColumnProperties } from 'exceljs'
import { DownloadExcelDatasetInterface } from '../../interfaces/DownloadUtilInterface';
import { getStringByteCount } from '../StringUtil';


export const downloadExcel = (dataset: DownloadExcelDatasetInterface, fileName?: string) => {
    if (!fileName) fileName = "download" // .xlsx

    // create basic object
    const workbook = new ExcelJs.Workbook();
    const sheet = workbook.addWorksheet("sheet 1");

    // create columns
    const columns: TableColumnProperties[] = Object.keys(dataset).map(key => {
        return { name: key }
    });

    // create rows
    const rows: string[][] = [];
    let minValuesLen = Object.values(dataset).reduce((pre, cur) => {
        return Math.min(pre, cur.length)
    }, Number.MAX_VALUE);
    if (minValuesLen === Number.MAX_VALUE) minValuesLen = 0;
    for (let i = 0; i < minValuesLen; i++) {
        let row: string[] = [];
        Object.keys(dataset).forEach((key) => {
            row.push(dataset[key][i]);
        })
        rows.push(row);
    }

    // build table
    sheet.addTable({
        name: 'sheet 1',  // 表格內看不到的，算是key值，讓你之後想要針對這個table去做額外設定的時候，可以指定到這個table
        ref: 'A1', // 從A1開始
        columns,
        rows,
    });
    Object.keys(dataset).forEach((columnName, index) => {
        let maxStrByteLen = getStringByteCount(columnName);
        maxStrByteLen = dataset[columnName].reduce((pre, cur) => Math.max(pre, getStringByteCount(cur)), maxStrByteLen);
        maxStrByteLen += 5;
        sheet.getColumn(index + 1).width = maxStrByteLen;
    })

    // download
    workbook.xlsx.writeBuffer().then((content) => {
        const link = document.createElement("a");
        const blobData = new Blob([content], {
            type: "application/vnd.ms-excel;charset=utf-8;"
        });
        link.download = `${fileName}.xlsx`;
        link.href = URL.createObjectURL(blobData);
        link.click();
    });
}