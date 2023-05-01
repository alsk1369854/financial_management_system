import React, { FC } from 'react'
import { ProjectInterface } from '../../../../interfaces/ProjectInterface'
import { DatePicker, Form, Input, Modal } from 'antd'
import { initCustomer } from '../../../../utils/ModelUtil'
import { EditingProjectInfoFormType } from './enums'
import { ProjectTableDataType } from '../ProjectFinancialTable/interfaces'
import { initProjectTableDataType } from '../ProjectFinancialTable/utils'
import locale from 'antd/es/date-picker/locale/zh_TW'


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
    const [form] = Form.useForm<ProjectInterface>();

    const onFinishFunc = () => {
        const formValues = form.getFieldsValue();
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
                    <Input placeholder="工程名稱" required></Input>
                </Form.Item>
                <Form.Item
                    label="地址"
                    name="address">
                    <Input placeholder="地址"></Input>
                </Form.Item>
                <Form.Item
                    label="開始日期"
                    name="startDate">
                    <DatePicker locale={locale} picker="month"/>
                </Form.Item>
                {/* <Form.Item
                    label="結束日期"
                    name="endDate">
                    <DatePicker />
                </Form.Item> */}
                {/* <Form.Item
                    label="描述"
                    name="description">
                    <Input.TextArea placeholder="描述"></Input.TextArea>
                </Form.Item> */}
            </Form>
        </Modal>
    )
}
