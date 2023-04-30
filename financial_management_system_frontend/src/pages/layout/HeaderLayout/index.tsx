import React, { FC, useState } from 'react'
import { Col, Row } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';


const menuItemList: MenuProps['items'] = [
    {
        label: '客戶帳務清單',
        key: 'customer_financial_list',
        icon: <UnorderedListOutlined />,
    }
];


export const HeaderLayout: FC = () => {
    const [currentMenuItem, setCurrentMenuItem] = useState('customer_financial_list');

    const menuItemOnClick: MenuProps['onClick'] = (e) => {
        setCurrentMenuItem(e.key);
    };


    return (
        <div style={{
            backgroundColor: "rgb(0, 21, 41)",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
            margin: 0,
            padding: 0
        }}>
            <Row justify="space-between" align="middle">
                <Col flex="340px">
                    <Row
                        justify="center"
                        align="middle"
                        style={{
                            padding: "5px 20px",
                        }}>
                        <span style={{
                            fontSize: 27,
                            fontWeight: "bold",
                            color: "rgb(243, 248, 255)"
                        }}>
                            家敬股份有限公司
                        </span>
                    </Row>
                </Col>
                <Col flex="auto">
                    <Menu
                        style={{
                            // fontSize: 20,
                            marginRight: 20,
                            float: "right",
                        }}
                        theme="dark"
                        onClick={menuItemOnClick}
                        selectedKeys={[currentMenuItem]}
                        mode="horizontal" items={menuItemList}
                    />
                </Col>
            </Row>
        </div>
    )
}
