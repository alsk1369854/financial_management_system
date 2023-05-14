import React, { FC, useState } from 'react'
import { Col, Row } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import ColorThemeConfig from '../../../configs/ColorThemeConfig';


const menuItemList: MenuProps['items'] = [
    {
        label: '客戶帳務清單',
        key: '/customer-financial',
        icon: <UnorderedListOutlined />,
    }
];


export const HeaderLayout: FC = () => {
    const navigate = useNavigate();

    const [currentMenuItem, setCurrentMenuItem] = useState('/customer-financial');

    const menuItemOnClick: MenuProps['onClick'] = (e) => {
        setCurrentMenuItem(e.key);
        navigate(e.key);
    };


    return (
        <div style={{
            backgroundColor: ColorThemeConfig.NAV_BACKGROUND,
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
            borderBottom: "1px solid #bcbcbc5e",
            margin: 0,
            padding: 0,
            transition: "background-color 1s ease",
        }}>
            <Row justify="space-between" align="middle">
                <Col flex="220px">
                    <Row
                        justify="center"
                        align="middle"
                        style={{
                            padding: "0px 20px",
                        }}>
                        <Link to="/" >
                            <span style={{
                                fontSize: 30,
                                fontWeight: "bold",
                                color: ColorThemeConfig.NAV_TEXT
                            }}>
                                家敬企業社
                            </span>
                        </Link>
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
                        mode="horizontal"
                        items={menuItemList}
                    />
                </Col>
            </Row>
        </div>
    )
}
