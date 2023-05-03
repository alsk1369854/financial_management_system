import React, { FC, useEffect, useRef } from 'react'
import { ProjectInterface } from '../../../../interfaces/ProjectInterface'
import { Button, DatePicker, Form, Input, InputRef, Modal, Space } from 'antd'
import { initCustomer } from '../../../../utils/ModelUtil'
import { EditingProjectInfoFormType } from './enums'
import { ProjectTableDataType } from '../ProjectFinancialTable/interfaces'
import { initProjectTableDataType } from '../ProjectFinancialTable/utils'
import AntDesignConfig from '../../../../configs/AntDesignConfig'
import { EditingAccountingItemForm } from './components/EditingAccountingItemForm'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';


interface EditingProjectInfoModalPropsInterface {
    formType: EditingProjectInfoFormType,
    defaultProjectInfo: ProjectInterface,
    submitCallbackFunc: (newProjectInfo: ProjectInterface) => void,
    cancelCallbackFunc: () => void
}

export const EditingProjectInfoModal: FC<EditingProjectInfoModalPropsInterface> = ({
    formType,
    defaultProjectInfo,
    submitCallbackFunc,
    cancelCallbackFunc
}) => {
    
    const projectNameInputRef = useRef<InputRef>(null);
    const [form] = Form.useForm<ProjectInterface>();

    useEffect(() => {
        if (projectNameInputRef.current) {
            projectNameInputRef.current.focus();
        }
    })

    const onFinishFunc = () => {
        const formValues = form.getFieldsValue();
        console.log(formValues)
        const newProjectInfo: ProjectInterface = { ...defaultProjectInfo, ...formValues };
        form.resetFields();
        submitCallbackFunc(newProjectInfo);
    }


    return (
        <Modal
            title={`${formType}客戶工程項目`}
            centered
            open={true}
            onOk={() => form.submit()}
            onCancel={() => {
                form.resetFields();
                cancelCallbackFunc();
            }}
            okText={formType}
            cancelText="取消"
        >
            {/*
            export interface ProjectInterface {
    id: number,
    name: string,
    address: string,
    startDate: Date,
    endDate: Date,
    invoiceCreateDate: Date,
    paymentDeadlineDate: Date,
    description: string,
    customer: CustomerInterface,
    accountingItemList: AccountingItemInterface[]
}
            */}
            <Form
                form={form}
                layout="vertical"
                initialValues={defaultProjectInfo}
                onFinish={onFinishFunc}
            >
                <Form.Item
                    label="工程名稱"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: '請填寫工程名稱'
                        }, {
                            whitespace: true,
                            message: '工程名稱不可空白'
                        }
                    ]}
                    hasFeedback>
                    <Input
                        size={AntDesignConfig.InputSize}
                        ref={projectNameInputRef}
                        autoFocus
                        placeholder="工程名稱"
                        required></Input>
                </Form.Item>
                <Form.Item
                    label="地址"
                    name="address">
                    <Input
                        size={AntDesignConfig.InputSize}
                        placeholder="地址"></Input>
                </Form.Item>
                <Space.Compact
                    size={AntDesignConfig.DatePickerSize}>
                    <Form.Item
                        label="開始日期"
                        name="startDate">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="結束日期"
                        name="endDate">
                        <DatePicker />
                    </Form.Item>
                </Space.Compact>
                <Space.Compact
                    size={AntDesignConfig.DatePickerSize}>
                    <Form.Item
                        label="收款截止日期"
                        name="paymentDeadlineDate">
                        <DatePicker size={AntDesignConfig.DatePickerSize} />
                    </Form.Item>
                    <Form.Item
                        label="收據開立日期"
                        name="invoiceCreateDate">
                        <DatePicker size={AntDesignConfig.DatePickerSize} />
                    </Form.Item>
                </Space.Compact>
                <Form.Item
                    label="描述"
                    name="description">
                    <Input.TextArea
                        // size={AntDesignConfig.DatePickerSize}
                        autoSize
                        placeholder="描述"></Input.TextArea>
                </Form.Item>

                <h3>帳務紀錄</h3>
                <Form.List name="accountingItemList">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'first']}
                                        rules={[{ required: true, message: 'Missing first name' }]}
                                    >
                                        <Input placeholder="First Name" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'last']}
                                        rules={[{ required: true, message: 'Missing last name' }]}
                                    >
                                        <Input placeholder="Last Name" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

            </Form>
        </Modal >
    )
}
