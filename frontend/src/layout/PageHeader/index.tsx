import React, { useState } from 'react'

import { Layout, Input, Typography, Button, Modal, Form, InputNumber } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

export const PageHeader: React.FC = () => {
    // const initFromData = {name:"123", arrears:0, remark:"321"}
    const [form] = Form.useForm();

    const [modalOpen, setModalOpen] = useState(false);

    const onFormCancel = () => {
        form.resetFields();
        setModalOpen(false);
    }
    const onFormSummit =() =>{
        form.submit();
    }



    return (
        <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
            <Title
                level={2}
                style={{
                    float: "left",
                    color: "white",
                    marginTop: "15px"
                }}>
                帳務管理系統
            </Title>
            <Button
                type="primary"
                size='large'
                onClick={() => setModalOpen(true)}
                style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    width: 120,
                    float: "right",
                    marginTop: 12
                }}
            >
                新增資料
            </Button>
            <Modal
                title="新增帳務資料"
                centered
                open={modalOpen}
                onOk={() => onFormSummit()}
                onCancel={() => onFormCancel()}
                okText="新增"
                cancelText="取消"
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        label="公司名稱"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '請填寫公司名稱'
                            },
                            {
                                whitespace: true,
                                message: '公司名稱不可空白'
                            },
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="公司名稱" required></Input>
                    </Form.Item>
                    <Form.Item
                        label="欠款金額"
                        name="arrears"
                        hasFeedback
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        />
                    </Form.Item>
                    <Form.Item label="備註" name="remark">
                        <Input.TextArea placeholder="備註"></Input.TextArea>
                    </Form.Item>
                    {/* <Form.Item label="新增" name="submit">
                        <Button block type='primary' htmlType='submit'></Button>
                    </Form.Item> */}
                </Form>
            </Modal>
        </Header>
    )
}
