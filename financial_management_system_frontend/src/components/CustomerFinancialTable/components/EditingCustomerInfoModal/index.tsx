import React, { FC } from 'react'
import { Form, Input, Modal } from 'antd';
import { CustomerInterface } from '../../../../interfaces/CustomerInterface';
import { EditingCustomerInfoFormType } from './enums';
import { CustomerTableDataType } from '../../interfaces';
import { initCustomerTableDataType } from '../../utils';


interface EditingCustomerInfoModalPropsInterface {
    formType: EditingCustomerInfoFormType,
    defaultFormValues?: CustomerTableDataType
    submitCallbackFunc: (newCustomerInfo: CustomerTableDataType, formType: EditingCustomerInfoFormType) => void,
    cancelCallbackFunc: () => void
}


export const EditingCustomerInfoModal: FC<EditingCustomerInfoModalPropsInterface> = ({
    formType,
    defaultFormValues = { ...initCustomerTableDataType },
    submitCallbackFunc,
    cancelCallbackFunc,
}) => {

    const [form] = Form.useForm<CustomerInterface>();

    const onFinishFunc = () => {
        const formValues = form.getFieldsValue();
        const newCustomerInfo = { ...defaultFormValues, ...formValues };
        form.resetFields();
        submitCallbackFunc(newCustomerInfo, formType);
    }

    return (
        <Modal
            title={`${formType}客戶訊息`}
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
                layout="vertical"
                initialValues={defaultFormValues}
                onFinish={onFinishFunc}
            >
                <Form.Item
                    label="客戶名稱"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: '請填寫客戶名稱'
                        }, {
                            whitespace: true,
                            message: '客戶名稱不可空白'
                        },
                    ]}
                    hasFeedback>
                    <Input placeholder="客戶名稱" required></Input>
                </Form.Item>
                <Form.Item
                    label="統一編號"
                    name="unifiedBusinessNumber"
                    rules={[
                        {
                            validator(rule, value) {
                                const strValue = "" + value;
                                console.log(strValue)
                                if ((strValue.length === 8 &&
                                    /[0-9]{8}/.exec(strValue)) ||
                                    strValue.length === 0) {
                                    return Promise.resolve();
                                }
                                return Promise.reject("統一編號格式錯誤")
                            },
                        }
                    ]}
                    hasFeedback>
                    <Input placeholder="統一編號"></Input>
                </Form.Item>
                <Form.Item
                    label="電話"
                    name="telephoneNumber">
                    <Input placeholder="電話"></Input>
                </Form.Item>
                <Form.Item
                    label="傳真"
                    name="faxNumber">
                    <Input placeholder="傳真"></Input>
                </Form.Item>
                <Form.Item
                    label="描述"
                    name="description">
                    <Input.TextArea placeholder="描述"></Input.TextArea>
                </Form.Item>
            </Form>
        </Modal>
    )
}
