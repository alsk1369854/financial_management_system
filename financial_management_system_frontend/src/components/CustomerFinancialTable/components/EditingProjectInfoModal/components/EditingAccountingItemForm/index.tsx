import React, { FC, useState } from 'react'
import { Form, FormInstance, FormListFieldData, Input, InputNumber, Select, Space } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { AccountingItemTypeEnum } from '../../../../../../interfaces/AccountingItemInterface';
import { accountingItemTypeSelectOptions } from './utils';
import { ProjectInterface } from '../../../../../../interfaces/ProjectInterface';
import AntDesignConfig from '../../../../../../configs/AntDesignConfig';


interface EditingAccountingItemFormPropsInterface {
    form: FormInstance<ProjectInterface>
    field: FormListFieldData,
    add: (defaultValue?: any, insertIndex?: number | undefined) => void,
    remove: (index: number) => void,
}

export const EditingAccountingItemForm: FC<EditingAccountingItemFormPropsInterface> = ({
    form,
    field,
    add,
    remove
}) => {
    const { key, name, ...restField } = field;

    const [count, setCount] = useState<number>(0);
    const render = () => { setCount(count + 1) };


    const getValidateStatus = () => {
        const type = form.getFieldValue(['accountingItemList', field.name, 'type']);
        return (type === AccountingItemTypeEnum.arrears) ? "error" : "success";
    }

    return (
        <>
            <Space
                key={key}
                style={{
                    display: 'flex',
                    height: 40,
                }}
                align='baseline' >
                <Form.Item
                    {...restField}
                    name={[name, 'title']}
                    validateStatus={getValidateStatus()}>
                    <Input
                        size={AntDesignConfig.InputSize}
                        placeholder="項目" />
                </Form.Item>
                <Form.Item
                    {...restField}
                    style={{ width: 70 }}
                    name={[name, 'type']}
                    validateStatus={getValidateStatus()}>
                    <Select
                        onChange={render}
                        size={AntDesignConfig.InputSize}
                        options={accountingItemTypeSelectOptions}
                    />
                </Form.Item>
                <Form.Item
                    {...restField}
                    name={[name, 'amount']}
                    validateStatus={getValidateStatus()}>
                    <InputNumber
                        size={AntDesignConfig.InputSize}
                        style={{ top: '-4px', width: "100%" }}
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
            </Space >
        </>
    )
}
