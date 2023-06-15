import React, { FC } from 'react'
import { Button, Space, Table, theme } from 'antd'
import { AccountBookOutlined } from '@ant-design/icons';
import { ThemeStyleDataInterface } from '../../../../../../interfaces/ThemeStyleInterface';


interface ProjectAccountingTablePropsInterface {
    projectID: number,
}

export const ProjectAccountingTable: FC<ProjectAccountingTablePropsInterface> = () => {
    const themeStyleData = theme.useToken().token as unknown as ThemeStyleDataInterface;
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        }, {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        }, {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        }, {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        }, {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        }, {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        }, {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        }, {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        }, {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];


    return (
        <>
            <Space
                style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between'
                }}
            >
                <h2>
                    帳務清單
                </h2>
                <Space>
                    <Button
                        style={{ backgroundColor: themeStyleData.successColor }}
                        type="primary"
                        size="large"
                        icon={<AccountBookOutlined />}
                        onClick={() => {
                            // addNewCustomer();
                        }}
                    >
                        新增帳務
                    </Button>
                </Space>
            </Space>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                scroll={{ y: 400 }}
            />
        </>
    )
}
