import React, { FC, useRef } from 'react'
import { InputRef, Modal, message } from 'antd';
import { getTableColumnSearchPropsFunction } from '../../../../utils/AntDesignUtil';
import { ProjectInterface } from '../../../../interfaces/ProjectInterface';
import Table, { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment'
import DateFormatConfig from '../../../../configs/DateFormatConfig';
import { compareDate } from '../../../../utils/SortUtil';
import { getProjectTableDataSource } from './utils';
import { ProjectTableDataType } from './interfaces';
import { deleteProjectById } from '../../../../services/ProjectService';
import ColorThemeConfig from '../../../../configs/ColorThemeConfig';
import { initCustomer } from '../../../../utils/ModelUtil';
import { EditingProjectInfoFormType } from '../EditingProjectInfoModal/enums';



export enum EditingProjectFormType {
    update = "更新",
    create = "創建",
}

interface ProjectFinancialTablePropsInterface {
    projectList: ProjectInterface[],
    customerId: number,
    deleteTableProject: (project: ProjectInterface) => void,
    setEditingProjectInfo: (project: ProjectInterface) => void,
    setEditingProjectInfoFormType: (editingProjectInfoFormType: EditingProjectInfoFormType) => void
}

export const ProjectFinancialTable: FC<ProjectFinancialTablePropsInterface> = ({
    customerId,
    projectList,
    deleteTableProject,
    setEditingProjectInfo,
    setEditingProjectInfoFormType
}) => {
    const searchInput = useRef<InputRef>(null);
    const tableColumnSearchProps = getTableColumnSearchPropsFunction(searchInput);
    const [messageApi, messageContextHolder] = message.useMessage();
    const successMassage = (context: string) => {
        messageApi.open({
            type: 'success',
            content: context,
        });
    };
    const errorMassage = (context: string) => {
        messageApi.open({
            type: 'error',
            content: context,
        });
    };

    // const [count, setCount] = useState<number>(0);
    // const render = () => setCount(count + 1)

    const tableDataSource = getProjectTableDataSource(projectList)

    const onDeleteTableData = (projectTableDataType: ProjectTableDataType) => {
        const { id: projectId } = projectTableDataType;
        if (projectId) {
            Modal.confirm({
                title: '確定要刪除這個 "工程" 的所有訊息嗎?',
                okText: "確認",
                okType: "danger",
                onOk: () => {
                    deleteProjectById(projectId)
                        .then(() => {
                            projectTableDataType.customer = {
                                ...initCustomer,
                                id: customerId
                            };
                            deleteTableProject(projectTableDataType);
                            successMassage("刪除完成");
                        })
                        .catch((error) => {
                            const { data: errorInfo } = error.response;
                            console.error(errorInfo);
                            errorMassage("刪除失敗");
                        })
                }
            })
        }
    }

    const tableColumns: ColumnsType<ProjectTableDataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'right',
            width: 58
        }, {
            title: '工程名稱',
            dataIndex: 'name',
            width: 250,
            sorter: (a, b) => { return a.name.localeCompare(b.name, "zh-TW") },
            ...tableColumnSearchProps('name')
        }, {
            title: '工程地址',
            dataIndex: 'address',
            width: 105,
            ...tableColumnSearchProps('address')
        }, {
            title: '工程結束日期',
            dataIndex: 'endDate',
            width: 150,
            render: (value, record) => {
                return moment(value).format(DateFormatConfig.DATE).valueOf();
            },
            sorter: (a, b) => compareDate(moment(a.endDate), moment(b.endDate)),
            ...tableColumnSearchProps('endDate')
        }, {
            title: '繳款截止日期',
            dataIndex: 'paymentDeadlineDate',
            width: 150,
            render: (value, record) => {
                return moment(value).format(DateFormatConfig.DATE).valueOf();
            },
            sorter: (a, b) => compareDate(moment(a.paymentDeadlineDate), moment(b.paymentDeadlineDate)),
            ...tableColumnSearchProps('paymentDeadlineDate')
        }, {
            title: '欠款總額',
            dataIndex: 'totalArrears',
            align: 'right',
            width: 110,
            sorter: (a, b) => a.totalArrears - b.totalArrears,
            render: (value, record) => {
                let textStyle = { color: "black" };
                if (value < 0) {
                    textStyle.color = ColorThemeConfig.ERROR;
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
                            style={{ color: ColorThemeConfig.SUCCESS, fontSize: 20 }}
                            onClick={() => {
                                projectTableDataType.customer = { ...initCustomer, id: customerId };
                                setEditingProjectInfoFormType(EditingProjectInfoFormType.update);
                                setEditingProjectInfo(projectTableDataType);
                            }} />
                        <DeleteOutlined
                            style={{ color: ColorThemeConfig.ERROR, marginLeft: 15, fontSize: 20 }}
                            onClick={() => {
                                onDeleteTableData(projectTableDataType);
                            }}
                        />
                    </>
                )
            }
        },
    ];

    return (
        <>
            {messageContextHolder}
            <Table
                rowClassName={(record, index) => {
                    return (index === tableDataSource.length - 1) ? 'table-bottom-row' : ''
                }}
                style={{
                    border: `solid ${ColorThemeConfig.NAV_BACKGROUND}`,
                    borderRadius: 10,
                }}
                scroll={{ y: window.innerHeight - 210 }}
                // size="middle"
                bordered
                rowKey="id"
                pagination={false}
                columns={tableColumns}
                dataSource={tableDataSource}
            />
        </>
    )
}
