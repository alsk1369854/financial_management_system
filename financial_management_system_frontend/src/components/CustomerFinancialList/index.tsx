import React, { FC, useEffect, useRef, useState } from 'react'
import { Button, Col, InputRef, Modal, Row, Space, Table, Form, Input, message } from 'antd';
import { UserAddOutlined, VerticalAlignBottomOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { getAllCustomer, updateCustomer } from '../../services/CustomerService';
import { getProjectByCustomerId } from '../../services/ProjectService';
import { getAccountingItemByProjectId } from '../../services/AccountingItemService';
import { AccountingItemTypeEnum } from '../../interfaces/AccountingItemInterface';
import { getTableColumnSearchPropsFunction } from '../../utils/antdUtil';

interface TableDataType {
    key: React.Key;
    name: string;
    unifiedBusinessNumber: string;
    telephoneNumber: string;
    faxNumber: string;
    description: string;
    totalArrears: number;
}


export const CustomerFinancialList: FC = () => {
    const searchInput = useRef<InputRef>(null);
    const tableColumnSearchProps = getTableColumnSearchPropsFunction(searchInput);
    const [editingTableDataForm] = Form.useForm();
    const [messageApi, messageContextHolder] = message.useMessage();


    const [count, setCount] = useState<number>(0);
    const render = () => setCount(count + 1)
    const [tableDataSource, setTableDataSource] = useState<any[]>([]);
    const [tableLoading, setTableLoading] = useState<boolean>(false);
    const [showTableDataEditingForm, setShowTableDataEditingForm] = useState<boolean>(false);
    const [editingTableData, setEditingTableData] = useState<any>({});

    useEffect(() => {
        if (count === 0) {
            getTableDataSource();
            render();
        }
        window.addEventListener("resize", render);
        return () => {
            window.removeEventListener("resize", render);
        }
    })

    const getTableDataSource = async () => {
        setTableLoading(true);
        const { data: customerList } = await getAllCustomer();
        let newTableDataSource: any[] = [];
        for (let index = 0; index < customerList.length; index++) {
            const customer = customerList[index];
            let customerTotalArrears = 0;
            const { id: customerId } = customer;
            const { data: projectList } = await getProjectByCustomerId(customerId);
            for (const project of projectList) {
                const { id: projectId } = project;
                const { data: AccountingItemList } = await getAccountingItemByProjectId(projectId);
                for (const accountingItem of AccountingItemList) {
                    const { amount, type } = accountingItem;
                    switch (type) {
                        case AccountingItemTypeEnum.arrears:
                            customerTotalArrears -= amount;
                            break;
                        case AccountingItemTypeEnum.receive:
                            customerTotalArrears += amount;
                            break;
                    }
                }
            }
            newTableDataSource.push({
                key: customerId,
                no: index + 1,
                totalArrears: customerTotalArrears,
                ...customer
            })
        }
        setTableDataSource(newTableDataSource);
        setTableLoading(false);
    }

    const onDeleteTableData = (record: any) => {
        Modal.confirm({
            title: "確定要刪除這個客戶的所有帳務訊息嗎?",
            okText: "確認",
            okType: "danger",
            onOk: () => {
                setTableDataSource((pre) => {
                    return pre.filter(item => record.key !== item.key)
                })
            }
        })
    }

    const onEditTableData = (record: any) => {
        setEditingTableData(record);
        editingTableDataForm.setFieldsValue({ ...record });
        setShowTableDataEditingForm(true);
    }

    const resetEditingTableDataForm = () => {
        editingTableDataForm.resetFields();
        setEditingTableData({});
    }

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

    const submitEditingTableDataForm = () => {
        const editingTableDataFormValues = editingTableDataForm.getFieldsValue();
        const prepareUpdateTableData = { ...editingTableData, ...editingTableDataFormValues };
        // const prepareUpdateTableData = editingTableDataFormValues; // error test
        setTableLoading(true);
        updateCustomer(prepareUpdateTableData)
            .then((response) => {
                const { data } = response;
                setTableDataSource(pre => {
                    return pre.map(item => {
                        return (data.id === item.id) ?
                            { ...prepareUpdateTableData, ...data } : item
                    })
                })
                successMassage("變更完成")
                resetEditingTableDataForm();
                setShowTableDataEditingForm(false);
            }).catch((error) => {
                const { data } = error.response;
                console.error(data);
                errorMassage("變更失敗")
            }).finally(() => {
                setTableLoading(false);
            });
    }


    const tableColumns: ColumnsType<TableDataType> = [
        {
            title: 'No.',
            dataIndex: 'no',
            key: 'no',
            width: 60
        }, {
            title: '客戶名稱',
            dataIndex: 'name',
            key: 'name',
            filterSearch: true,
            sorter: (a, b) => { return a.name.localeCompare(b.name, "zh-TW") },
            ...tableColumnSearchProps('name')
        }, {
            title: '統一編號',
            dataIndex: 'unifiedBusinessNumber',
            key: 'unifiedBusinessNumber',
            width: 105,
            ...tableColumnSearchProps('unifiedBusinessNumber')
        }, {
            title: '電話',
            dataIndex: 'telephoneNumber',
            key: 'telephoneNumber',
            width: 150,
            ...tableColumnSearchProps('telephoneNumber')
        }, {
            title: '傳真',
            dataIndex: 'faxNumber',
            key: 'faxNumber',
            width: 150,
            ...tableColumnSearchProps('faxNumber')
        }, {
            title: '欠款總額',
            dataIndex: 'totalArrears',
            key: 'totalArrears',
            align: 'right',
            width: 150,
            sorter: (a, b) => a.totalArrears - b.totalArrears,
            render: (value: any, record: any) => {
                let textStyle = { color: "black" };
                if (value < 0) {
                    textStyle.color = "rgb(255, 77, 79)";
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
            key: 'description',
        },
        {
            title: '動作',
            dataIndex: 'action',
            key: 'action',
            width: 100,
            render: (_: any, record: any) => {
                return (
                    <>
                        <EditOutlined
                            style={{ color: "rgb(22, 119, 255)", fontSize: 20 }}
                            onClick={() => {
                                onEditTableData(record);
                            }} />
                        <DeleteOutlined
                            style={{ color: "rgb(42, 169, 176)", marginLeft: 15, fontSize: 20 }}
                            onClick={() => {
                                onDeleteTableData(record)
                            }}
                        />
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
                background: "rgb(255,255,255)",
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
                            color: "rgb(30, 30, 30)"
                        }}>
                        客戶帳務清單
                    </span>
                </Col>
                <Col>
                    <Space>
                        <Button
                            type="primary"
                            size="large"
                            icon={<UserAddOutlined />}
                        >新增客戶訊息</Button>
                        <Button
                            // danger // rgb(255, 77, 79)
                            style={{ backgroundColor: "rgb(42, 169, 176)" }}
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
                    style={{
                        width: "100%"
                    }}
                    expandable={{
                        expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                        rowExpandable: (record) => record.name !== 'Not Expandable',
                    }}
                    scroll={{ y: window.innerHeight - 210 }}
                    pagination={false}
                    loading={tableLoading}
                    columns={tableColumns}
                    dataSource={tableDataSource}
                />
            </Row>

            <Modal
                title="編輯客戶訊息"
                centered
                open={showTableDataEditingForm}
                onOk={() => {
                    submitEditingTableDataForm();
                }}
                onCancel={() => {
                    resetEditingTableDataForm();
                    setShowTableDataEditingForm(false);
                }}
                okText="變更"
                cancelText="取消"
            >
                <Form
                    form={editingTableDataForm}
                    layout="vertical"
                    defaultValue={editingTableDataForm.getFieldsValue()}
                >
                    <Form.Item
                        label="客戶名稱"
                        name="name"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '請填寫客戶名稱'
                            }, {
                                whitespace: true,
                                message: '客戶名稱不可空白'
                            }
                        ]}>
                        <Input placeholder="客戶名稱" required></Input>
                    </Form.Item>
                    <Form.Item
                        label="統一編號"
                        name="unifiedBusinessNumber"
                        hasFeedback>
                        <Input placeholder="統一編號"></Input>
                    </Form.Item>
                    <Form.Item
                        label="電話"
                        name="telephoneNumber"
                        hasFeedback>
                        <Input placeholder="電話"></Input>
                    </Form.Item>
                    <Form.Item
                        label="傳真"
                        name="faxNumber"
                        hasFeedback>
                        <Input placeholder="傳真"></Input>
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="description">
                        <Input.TextArea placeholder="描述"></Input.TextArea>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
