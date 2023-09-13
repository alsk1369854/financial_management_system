import { ColumnsType } from "antd/es/table";
import { ProjectTableDataType } from "../interfaces";
import { theme } from "antd";
import { getTableColumnSearchPropsFunction } from "../../../../../utils/AntDesignUtil";
import { ThemeStyleDataInterface } from "../../../../../interfaces/ThemeStyleInterface";

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
export const getProjectTableColumnsConfig = (
    editProject:(projectTableData:ProjectTableDataType)=>void,
    deleteCustomerProject:(projectTableData:ProjectTableDataType)=>void,
):ColumnsType<ProjectTableDataType>=>{
    const themeStyleData = theme.useToken().token as unknown as ThemeStyleDataInterface;
    const tableColumnSearchProps = getTableColumnSearchPropsFunction();
    return [
        {
            title: '工程名稱',
            dataIndex: 'name',
            width: 245,
            sorter: (a, b) => { return a.name.localeCompare(b.name, "zh-TW") },
            ...tableColumnSearchProps('name')
        }, {
            title: '工程地址',
            dataIndex: 'address',
            width: 405,
            responsive: ['xl'],
            ...tableColumnSearchProps('address')
        }, {
            title: '工程結束日期',
            dataIndex: 'endDate',
            width: 150,
            responsive: ['xxl'],
            // render: (value, record) => {
            //     return dayjs(value).format(DateFormatConfig.DATE);
            // },
            // sorter: (a, b) =>  compareDate(dayjs(a.endDate), dayjs(b.endDate)),
            // ...tableColumnSearchProps('endDate')
        }, {
            title: '繳款截止日期',
            dataIndex: 'paymentDeadlineDate',
            width: 150,
            // render: (value, record) => {
            //     return dayjs(value).format(DateFormatConfig.DATE);
            // },
            // sorter: (a, b) => compareDate(dayjs(a.paymentDeadlineDate), dayjs(b.paymentDeadlineDate)),
            // ...tableColumnSearchProps('paymentDeadlineDate')
        }, {
            title: '欠款總額',
            dataIndex: 'totalArrears',
            align: 'right',
            width: 110,
            sorter: (a, b) => a.totalArrears - b.totalArrears,
            render: (value, record) => {
                let textStyle = { color: themeStyleData.colorText };
                if (value < 0) {
                    textStyle.color = themeStyleData.errorColor;
                }
                return (
                    <span style={textStyle}>
                        {`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </span>
                )
            }
        }, {
            title: '描述',
            dataIndex: 'description',
            responsive: ['xxl'],
        },
        {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            width: 100,
            render: (_, projectTableDataType) => {
                return (
                    <>
                        <EditOutlined
                            style={{ color: themeStyleData.successColor, fontSize: 20 }}
                            onClick={() => {
                                editProject(projectTableDataType);
                            }} />
                        <DeleteOutlined
                            style={{ color: themeStyleData.errorColor, marginLeft: 15, fontSize: 20 }}
                            onClick={() => {
                                deleteCustomerProject(projectTableDataType);
                            }}
                        />
                    </>
                )
            }
        },
    ];
}