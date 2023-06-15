import React, { FC, useEffect, useRef } from 'react'
import { ProjectInterface } from '../../../../interfaces/ProjectInterface'
import { Button, DatePicker, Form, Input, InputRef, Modal, Space, Table } from 'antd'
import { initAccountingItem, initProject } from '../../../../utils/ModelUtil'
import { EditingProjectInfoFormType } from './enums'
import AntDesignConfig from '../../../../configs/AntDesignConfig'
import { EditingAccountingItemForm } from './components/EditingAccountingItemForm'
import { PlusOutlined } from '@ant-design/icons';
import { ProjectAccountingTable } from './components/ProjectAccountingTable'



interface EditingProjectInfoModalPropsInterface {
    formType: EditingProjectInfoFormType,
    defaultProjectInfo?: ProjectInterface,
    submitCallbackFunc: (formType: EditingProjectInfoFormType, newProjectInfo: ProjectInterface) => void,
    cancelCallbackFunc: () => void
}

export const EditingProjectInfoModal: FC<EditingProjectInfoModalPropsInterface> = ({
    formType,
    defaultProjectInfo = { ...initProject },
    submitCallbackFunc,
    cancelCallbackFunc
}) => {
    // console.log(defaultProjectInfo)

    const projectNameInputRef = useRef<InputRef>(null);
    const [form] = Form.useForm<ProjectInterface>();

    useEffect(() => {
        if (projectNameInputRef.current) {
            projectNameInputRef.current.focus();
        }
    })

    const onFinishFunc = () => {
        const formValues = form.getFieldsValue();
        const newProjectInfo: ProjectInterface = { ...defaultProjectInfo, ...formValues };
        form.resetFields();
        submitCallbackFunc(formType, newProjectInfo);
    }


    return (
        <Modal
            title={`${formType}客戶工程項目`}
            width={"90%"}
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
            <Form
                form={form}
                layout="horizontal"
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
                <Space
                    size={AntDesignConfig.DatePickerSize}>
                    <Form.Item
                        label="開始日期"
                        name="startDate">
                        <DatePicker
                            mode="date"
                            size={AntDesignConfig.DatePickerSize} />
                    </Form.Item>
                    <Form.Item
                        label="結束日期"
                        name="endDate">
                        <DatePicker
                            mode="date"
                            size={AntDesignConfig.DatePickerSize} />
                    </Form.Item>
                </Space>
                <br />
                <Space
                    size={AntDesignConfig.DatePickerSize}>
                    <Form.Item
                        label="收款截止日期"
                        name="paymentDeadlineDate">
                        <DatePicker
                            mode="date"
                            size={AntDesignConfig.DatePickerSize} />
                    </Form.Item>
                    <Form.Item
                        label="收據開立日期"
                        name="invoiceCreateDate">
                        <DatePicker
                            mode="date"
                            size={AntDesignConfig.DatePickerSize} />
                    </Form.Item>
                </Space>
                <Form.Item
                    label="描述"
                    name="description">
                    <Input.TextArea
                        // size={AntDesignConfig.DatePickerSize}
                        autoSize
                        placeholder="描述"></Input.TextArea>
                </Form.Item>
            </Form>

            <hr></hr>
            <ProjectAccountingTable projectID={0} />


            {/* <Form.List name="accountingItemList">
                    {(fields, { add, remove }) => {
                        return (
                            <>
                                <Form.Item
                                    style={{
                                        marginBottom: 15
                                    }}>
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            add({ ...initAccountingItem }, 0)
                                        }}
                                        block icon={<PlusOutlined />}>

                                        添加帳務新項目
                                    </Button>
                                </Form.Item>
                                {fields.map((field) => (
                                    <EditingAccountingItemForm
                                        key={field.key}
                                        form={form}
                                        field={field}
                                        add={add}
                                        remove={remove}
                                    />
                                ))}

                            </>
                        )
                    }}
                </Form.List> 

        </Form>*/}

        </Modal >
    )
}
