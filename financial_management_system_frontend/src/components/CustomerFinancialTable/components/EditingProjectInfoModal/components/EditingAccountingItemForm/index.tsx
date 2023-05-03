import { DatePicker, Form, Input, Space } from 'antd';
import React, { FC } from 'react'
import AntDesignConfig from '../../../../../../configs/AntDesignConfig';


export const EditingAccountingItemForm: FC = () => {

    // const [form] = Form.useForm<any>();
    return (
        // <Form
        //     form={form}
        //     name='index'>
            <Space.Compact>
                <Form.Item
                    label="類別"
                    name="type">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="金額"
                    name="amount">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="生效日期"
                    name="date">
                    <DatePicker size={AntDesignConfig.DatePickerSize} />
                </Form.Item>
            </Space.Compact>
        // </Form>
    )
}
