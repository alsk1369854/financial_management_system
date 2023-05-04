import { DatePicker, Form, FormListFieldData, Input, InputNumber, Space } from 'antd';
import React, { FC } from 'react'
import AntDesignConfig from '../../../../../../configs/AntDesignConfig';

import { MinusCircleOutlined } from '@ant-design/icons';


interface EditingAccountingItemFormPropsInterface {
    field: FormListFieldData,
    add: (defaultValue?: any, insertIndex?: number | undefined) => void,
    remove: (index: number | number[]) => void,
}

export const EditingAccountingItemForm: FC<EditingAccountingItemFormPropsInterface> = ({
    field,
    add,
    remove
}) => {
    const { key, name, ...restField } = field;

    return (
        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
            <Form.Item
                {...restField}
                name={[name, 'type']}
            // rules={[{ required: true, message: 'Missing first name' }]}
            >
                <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
                {...restField}
                name={[name, 'amount']}
            // rules={[{ required: true, message: 'Missing last name' },

            // ]}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                />
            </Form.Item>
            <MinusCircleOutlined onClick={() => remove(name)} />
        </Space>
    )
}
