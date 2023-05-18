import React, { FC, useRef } from 'react'
import { InputRef, theme } from 'antd';
import { getTableColumnSearchPropsFunction } from '../../../../utils/AntDesignUtil';
import { ProjectInterface } from '../../../../interfaces/ProjectInterface';
import Table, { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DateFormatConfig from '../../../../configs/DateFormatConfig';
import { compareDate } from '../../../../utils/SortUtil';
import { getProjectTableDataSource } from './utils';
import { ProjectTableDataType } from './interfaces';
import { EditingProjectInfoFormType } from '../EditingProjectInfoModal/enums';
import dayjs from 'dayjs';
import './index.css'
import { ThemeStyleDataInterface } from '../../../../interfaces/ThemeStyleInterface';


export enum EditingProjectFormType {
    update = "更新",
    create = "創建",
}

interface ProjectFinancialTablePropsInterface {
    projectList: ProjectInterface[],
    customerId: number,
    deleteCustomerProject: (project: ProjectInterface) => void,
    setEditingProjectInfo: (project: ProjectInterface) => void,
    setEditingProjectInfoFormType: (editingProjectInfoFormType: EditingProjectInfoFormType) => void
}

export const ProjectFinancialTable: FC<ProjectFinancialTablePropsInterface> = ({
    customerId,
    projectList,
    deleteCustomerProject,
    setEditingProjectInfo,
    setEditingProjectInfoFormType
}) => {
    
    const themeStyleData = theme.useToken().token as unknown as ThemeStyleDataInterface;

    const searchInput = useRef<InputRef>(null);
    const tableColumnSearchProps = getTableColumnSearchPropsFunction(searchInput);

    // const [count, setCount] = useState<number>(0);
    // const render = () => setCount(count + 1)

    const tableDataSource = getProjectTableDataSource(projectList, customerId);

    const editProject = (project: ProjectInterface) => {
        setEditingProjectInfoFormType(EditingProjectInfoFormType.update);
        setEditingProjectInfo(project);
    }

    const tableColumns: ColumnsType<ProjectTableDataType> = [
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
            render: (value, record) => {
                return dayjs(value).format(DateFormatConfig.DATE);
            },
            sorter: (a, b) => compareDate(dayjs(a.endDate), dayjs(b.endDate)),
            ...tableColumnSearchProps('endDate')
        }, {
            title: '繳款截止日期',
            dataIndex: 'paymentDeadlineDate',
            width: 150,
            render: (value, record) => {
                return dayjs(value).format(DateFormatConfig.DATE);
            },
            sorter: (a, b) => compareDate(dayjs(a.paymentDeadlineDate), dayjs(b.paymentDeadlineDate)),
            ...tableColumnSearchProps('paymentDeadlineDate')
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

    return (
        <>
            <Table
                rowClassName={(record, index) => {
                    return 'project_table_column'
                }}
                className='project_table'
                style={{ borderColor: themeStyleData.colorBorder }}
                bordered
                rowKey="id"
                pagination={false}
                columns={tableColumns}
                dataSource={tableDataSource}
            />
        </>
    )
}
