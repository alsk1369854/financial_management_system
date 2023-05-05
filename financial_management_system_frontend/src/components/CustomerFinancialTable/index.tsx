import React, { FC, useEffect, useRef, useState } from 'react'
import { Button, Col, InputRef, Modal, Row, Space, Table, message } from 'antd';
import { UserAddOutlined, VerticalAlignBottomOutlined, EditOutlined, DeleteOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { addCustomer, deleteCustomerById, updateCustomer } from '../../services/CustomerService';
import { getTableColumnSearchPropsFunction } from '../../utils/AntDesignUtil';
import { CustomerInterface } from '../../interfaces/CustomerInterface';
import { AxiosResponse } from 'axios';
import { EditingCustomerInfoModal } from './components/EditingCustomerInfoModal';
import { EditingCustomerInfoFormType } from './components/EditingCustomerInfoModal/enums';
import scrollIntoView from 'scroll-into-view';
import { CustomerTableDataType } from './interfaces';
import { ProjectFinancialTable } from './components/ProjectFinancialTable';
import { asyncGetCustomerTableDataSource, getCustomerTotalArrears } from './utils';
import ColorThemeConfig from '../../configs/ColorThemeConfig';
import { ProjectInterface } from '../../interfaces/ProjectInterface';
import { initProject, projectDateToMomentJs } from '../../utils/ModelUtil';
import { EditingProjectInfoModal } from './components/EditingProjectInfoModal';
import { EditingProjectInfoFormType } from './components/EditingProjectInfoModal/enums';
import { addProject, updateProjectById } from '../../services/ProjectService';


export const CustomerFinancialTable: FC = () => {
    const columnSearchInputRef = useRef<InputRef>(null);
    const tableColumnSearchProps = getTableColumnSearchPropsFunction(columnSearchInputRef);
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

    const [count, setCount] = useState<number>(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const render = () => { setCount(count + 1) };
    const [tableDataSource, setTableDataSource] = useState<CustomerTableDataType[]>([]);
    const [tableLoading, setTableLoading] = useState<boolean>(false);
    const [editingCustomerInfo, setEditingCustomerInfo] = useState<CustomerTableDataType | undefined>();
    const [editingCustomerInfoFormType, setEditingCustomerInfoFromType] = useState<EditingCustomerInfoFormType | undefined>();
    const [editingProjectInfoFormType, setEditingProjectInfoFormType] = useState<EditingProjectInfoFormType | undefined>()
    const [editingProjectInfo, setEditingProjectInfo] = useState<ProjectInterface | undefined>();

    useEffect(() => {
        if (count === 0) {
            updateCustomerTableDataSource();
        }
        window.addEventListener("resize", render);
        return () => {
            window.removeEventListener("resize", render);
        }
    }, [count, render])

    const updateCustomerTableDataSource = () => {
        setTableLoading(true);
        asyncGetCustomerTableDataSource((tableDataSource) => {
            setTableDataSource(tableDataSource);
            setTableLoading(false);
            setCount(count + 1);
        })
    }

    const onDeleteTableData = (customerTableDataType: CustomerTableDataType) => {
        const { id: customerId } = customerTableDataType;
        if (customerId) {
            Modal.confirm({
                title: '確定要刪除這個 "客戶" 的所有訊息嗎?',
                okText: "確認",
                okType: "danger",
                onOk: () => {
                    deleteCustomerById(customerId)
                        .then(() => {
                            setTableDataSource((pre) => {
                                return pre.filter(item => customerTableDataType.id !== item.id)
                            })
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


    const editingCustomerInfoFormSubmitHandler = (
        newCustomerInfo: CustomerTableDataType,
        formType: EditingCustomerInfoFormType
    ) => {
        // const newCustomerInfo = editingCustomerInfoFormValues; // error test
        setTableLoading(true);
        let requestFunc: Promise<AxiosResponse<CustomerInterface, any>> = new Promise((resolve, reject) => { });
        switch (formType) {
            case EditingCustomerInfoFormType.create:
                requestFunc = addCustomer(newCustomerInfo);
                requestFunc.then((response) => {
                    const { data } = response;
                    setTableDataSource((pre) => {
                        return [
                            ...pre,
                            {
                                ...newCustomerInfo,
                                ...data,
                                totalArrears: 0,
                            }];
                    })
                    successMassage("新增完成")
                    scrollIntoView(document.querySelector('.table-bottom-row') as HTMLElement, {
                        align: {
                            top: 0,
                        },
                    });
                })
                break;
            case EditingCustomerInfoFormType.update:
                requestFunc = updateCustomer(newCustomerInfo)
                requestFunc.then((response) => {
                    const { data: newCustomerData } = response;
                    setTableDataSource((pre) => {
                        return pre.map(item => {
                            return (newCustomerData.id === item.id) ? {
                                ...newCustomerData,
                                totalArrears: getCustomerTotalArrears(newCustomerData)
                            } : item
                        })
                    })
                    successMassage("變更完成");
                })
                break;
        }
        requestFunc.catch((error) => {
            const { data } = error.response;
            console.error(data);
            errorMassage("失敗")
        }).finally(() => {
            editingCustomerInfoFormCancelHandler();
            setTableLoading(false);
        });
    }

    const editingCustomerInfoFormCancelHandler = () => {
        setEditingCustomerInfo(undefined);
        setEditingCustomerInfoFromType(undefined);
    }

    const editingProjectInfoFormSubmitHandler = (newProjectInfo: ProjectInterface, formType: EditingProjectInfoFormType) => {
        setTableLoading(true);
        let requestFunc: Promise<AxiosResponse<ProjectInterface, any>> = new Promise((resolve, reject) => { });

        const { id: newProjectCustomerId } = newProjectInfo.customer;
        switch (formType) {
            case EditingProjectInfoFormType.create:
                requestFunc = addProject(newProjectInfo);
                requestFunc.then((response) => {
                    let { data: newProjectData } = response;
                    newProjectData = projectDateToMomentJs(newProjectData);
                    setTableDataSource((customerTableDataTypeList) => {
                        return customerTableDataTypeList.map((customerTableDataType) => {
                            const { id } = customerTableDataType;
                            if (id === newProjectCustomerId) {
                                customerTableDataType.projectList.push(newProjectData);
                                customerTableDataType.totalArrears = getCustomerTotalArrears(customerTableDataType);
                            }
                            return customerTableDataType;
                        })
                    })
                    successMassage("成功");
                })
                break;
            case EditingProjectInfoFormType.update:
                requestFunc = updateProjectById(newProjectInfo);
                requestFunc.then((response) => {
                    let { data: newProjectData } = response;
                    newProjectData = projectDateToMomentJs(newProjectData);
                    setTableDataSource((customerTableDataTypeList) => {
                        return customerTableDataTypeList.map((customerTableDataType) => {
                            const { id, projectList } = customerTableDataType;
                            if (id === newProjectCustomerId) {
                                customerTableDataType.projectList = projectList.map((project) => {
                                    return (newProjectData.id === project.id) ? newProjectData : project;
                                })
                                customerTableDataType.totalArrears = getCustomerTotalArrears(customerTableDataType);
                            }
                            return customerTableDataType;
                        })
                    })
                    successMassage("成功");
                })
                break;
        }

        requestFunc.catch((response) => {
            const { data } = response;
            console.error(data);
            errorMassage("失敗");
        }).finally(() => {
            editingProjectInfoFormCancelHandler();
            setTableLoading(false);
        })
    }

    const editingProjectInfoFormCancelHandler = () => {
        setEditingProjectInfo(undefined);
        setEditingProjectInfoFormType(undefined);
    }

    const deleteTableProject = (project: ProjectInterface) => {
        const { id: deleteProjectId, customer } = project;
        const { id: deleteCustomerId } = customer;
        setTableDataSource(pre => {
            return pre.map((customerTableDataType) => {
                const { id: customerId, projectList } = customerTableDataType;
                if (customerId === deleteCustomerId) {
                    customerTableDataType.projectList = projectList.filter((project) => {
                        const { id: projectId } = project;
                        return projectId !== deleteProjectId;
                    })
                    customerTableDataType.totalArrears = getCustomerTotalArrears(customerTableDataType);
                }
                return customerTableDataType;
            })
        })
    }

    const tableColumns: ColumnsType<CustomerTableDataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'right',
            width: 58
        }, {
            title: '客戶名稱',
            dataIndex: 'name',
            width: 250,
            sorter: (a, b) => { return a.name.localeCompare(b.name, "zh-TW") },
            ...tableColumnSearchProps('name')
        }, {
            title: '統一編號',
            dataIndex: 'unifiedBusinessNumber',
            width: 105,
            ...tableColumnSearchProps('unifiedBusinessNumber')
        }, {
            title: '電話',
            dataIndex: 'telephoneNumber',
            width: 150,
            ...tableColumnSearchProps('telephoneNumber')
        }, {
            title: '傳真',
            dataIndex: 'faxNumber',
            width: 150,
            ...tableColumnSearchProps('faxNumber')
        }, {
            title: '欠款總額',
            dataIndex: 'totalArrears',
            align: 'right',
            width: 110,
            sorter: (a, b) => a.totalArrears - b.totalArrears,
            render: (value: any, record: any) => {
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
            width: 125,
            align: "center",
            render: (_: any, record: any) => {
                return (
                    <>
                        <EditOutlined
                            style={{ color: ColorThemeConfig.SUCCESS, fontSize: 20 }}
                            onClick={() => {
                                setEditingCustomerInfoFromType(EditingCustomerInfoFormType.update);
                                setEditingCustomerInfo(record);
                            }} />
                        <DeleteOutlined
                            style={{ color: ColorThemeConfig.ERROR, marginLeft: 15, fontSize: 20 }}
                            onClick={() => {
                                onDeleteTableData(record);
                            }} />
                        <AppstoreAddOutlined
                            style={{ color: ColorThemeConfig.OTHER_1, marginLeft: 15, fontSize: 20 }}
                            onClick={() => {
                                const { id: customerId } = record;
                                let defaultNewProjectInfo = { ...initProject };
                                defaultNewProjectInfo.customer.id = customerId;
                                setEditingProjectInfo(defaultNewProjectInfo);
                                setEditingProjectInfoFormType(EditingProjectInfoFormType.create);
                            }} />
                    </>
                )
            }
        },
    ];


    return (
        <div
            style={{
                width: "100%",
                // decrease header and container padding  
                height: window.innerHeight - 86,
                background: ColorThemeConfig.BACKGROUND,
                boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 5px 0px",
                borderRadius: 10
            }}
        >
            {messageContextHolder}
            <Row
                justify="space-between"
                style={{
                    padding: "10px 20px"
                }}
            >
                <Col>
                    <span
                        style={{
                            fontSize: 25,
                            fontWeight: "bold",
                            color: ColorThemeConfig.TEXT
                        }}>
                        客戶帳務清單
                    </span>
                </Col>
                <Col>
                    <Space>
                        <Button
                            style={{ backgroundColor: ColorThemeConfig.SUCCESS }}
                            type="primary"
                            size="large"
                            icon={<UserAddOutlined />}
                            onClick={() => {
                                setEditingCustomerInfoFromType(EditingCustomerInfoFormType.create);
                                setEditingCustomerInfo(undefined);
                            }}
                        >新增客戶訊息</Button>
                        <Button
                            style={{ backgroundColor: ColorThemeConfig.OTHER_1 }}
                            type="primary"
                            size="large"
                            icon={<VerticalAlignBottomOutlined />}
                        >下載報表</Button>
                    </Space>
                </Col>
            </Row>
            <Row
                style={{
                    width: "100%"
                }}>
                <Table
                    rowClassName={(record, index) => {
                        return (index === tableDataSource.length - 1) ? 'table-bottom-row' : ''
                    }}
                    style={{
                        width: "100%"
                    }}
                    expandable={{
                        expandedRowRender: (CustomerTableDataType) => {
                            const { projectList, id: customerId } = CustomerTableDataType;
                            return (customerId) ? (
                                <ProjectFinancialTable
                                    customerId={customerId}
                                    projectList={[...projectList]}
                                    deleteTableProject={deleteTableProject}
                                    setEditingProjectInfo={setEditingProjectInfo}
                                    setEditingProjectInfoFormType={setEditingProjectInfoFormType} />
                            ) : <></>
                        },
                        rowExpandable: (record) => record.name !== 'Not Expandable',
                    }}
                    scroll={{ y: window.innerHeight - 210 }}
                    bordered
                    rowKey="id"
                    pagination={false}
                    loading={tableLoading}
                    columns={tableColumns}
                    dataSource={tableDataSource}
                />
            </Row>
            {(editingCustomerInfoFormType) ? (
                <EditingCustomerInfoModal
                    submitCallbackFunc={editingCustomerInfoFormSubmitHandler}
                    cancelCallbackFunc={editingCustomerInfoFormCancelHandler}
                    formType={editingCustomerInfoFormType}
                    defaultFormValues={editingCustomerInfo} />
            ) : <></>
            }
            {(editingProjectInfoFormType) ? (
                <EditingProjectInfoModal
                    formType={editingProjectInfoFormType}
                    defaultProjectInfo={editingProjectInfo}
                    submitCallbackFunc={editingProjectInfoFormSubmitHandler}
                    cancelCallbackFunc={editingProjectInfoFormCancelHandler}
                />
            ) : <></>
            }
        </div >
    )
}
