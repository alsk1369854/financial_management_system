import React, { FC, useEffect, useRef } from 'react'
import { Form, Input, InputRef, Modal } from 'antd';
import { CustomerInterface } from '../../../../interfaces/CustomerInterface';
import { EditingCustomerInfoFormType } from './enums';
import AntDesignConfig from '../../../../configs/AntDesignConfig';
import { initCustomer } from '../../../../utils/ModelUtil';


interface EditingCustomerInfoModalPropsInterface {
    formType: EditingCustomerInfoFormType,
    defaultFormValues?: CustomerInterface
    submitCallbackFunc: (formType: EditingCustomerInfoFormType, newCustomerInfo: CustomerInterface) => void,
    cancelCallbackFunc: () => void
}


export const EditingCustomerInfoModal: FC<EditingCustomerInfoModalPropsInterface> = ({
    formType,
    defaultFormValues = { ...initCustomer },
    submitCallbackFunc,
    cancelCallbackFunc,
}) => {


    const customerNameInputRef = useRef<InputRef>(null);
    const [form] = Form.useForm<CustomerInterface>();

    useEffect(() => {
        if (customerNameInputRef.current) {
            customerNameInputRef.current.focus();
        }
    })

    const onFinishFunc = () => {
        const formValues = form.getFieldsValue();
        const newCustomerInfo = { ...defaultFormValues, ...formValues };
        form.resetFields();
        submitCallbackFunc(formType, newCustomerInfo);
    }

    return (
        <Modal
            title={`${formType}客戶訊息`}
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
                // layout="vertical"
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
                    <Input
                        size={AntDesignConfig.InputSize}
                        ref={customerNameInputRef}
                        autoFocus
                        placeholder="客戶名稱"
                        required>
                    </Input>
                </Form.Item>
                <Form.Item
                    label="統一編號"
                    name="unifiedBusinessNumber"
                    rules={[
                        {
                            validator(rule, value) {
                                const strValue = "" + value;
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
                    <Input
                        size={AntDesignConfig.InputSize}
                        placeholder="統一編號">
                    </Input>
                </Form.Item>
                <Form.Item
                    label="電話"
                    name="telephoneNumber">
                    <Input
                        size={AntDesignConfig.InputSize}
                        placeholder="電話">

                    </Input>
                </Form.Item>
                <Form.Item
                    label="傳真"
                    name="faxNumber">
                    <Input
                        size={AntDesignConfig.InputSize}
                        placeholder="傳真">

                    </Input>
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
