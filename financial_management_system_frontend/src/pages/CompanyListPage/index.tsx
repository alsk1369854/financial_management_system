import React, { FC, useEffect, useState } from 'react'

import { Typography, Layout, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getAllCompany } from '../../services/CompanyService';
import { CompanyInterface } from '../../interfaces/CompanyInterface';
import { PageHeader } from '../layout/PageHeader';

const { Content } = Layout;
const { Title } = Typography;

interface IProps {
  colorBgContainer: string
}

const columns: ColumnsType<CompanyInterface> = [
  { title: 'No.', dataIndex: 'id', key: 'id' },
  { title: '公司名稱', dataIndex: 'name', key: 'name' },
  { title: '欠款', dataIndex: 'arrears', key: 'arrears' },
  { title: '備註', dataIndex: 'remark', key: 'remark' },
  {
    title: '動作',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
  },
];

export const CompanyListPage: FC<IProps> = ({
  colorBgContainer
}) => {

  const [companyList, setCompanyList] = useState<CompanyInterface[]>([])

  useEffect(() => {
    getCompanyList()
  }, [])

  const getCompanyList = async (): Promise<void> => {
    const response = await getAllCompany();
    let newCompanyList = response.data.map((company: CompanyInterface) => {
      return {
        key: company.id,
        ...company
      }
    })
    setCompanyList(newCompanyList);
  }

  return (
    <Layout>
      <PageHeader></PageHeader>
      <Content className="site-layout" style={{ padding: '0 50px' , height:"100%"}}>
        <Title level={3}>廠商清單</Title>
        <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>
          <Table
            columns={columns}
            dataSource={companyList}
          />
        </div>
      </Content>
    </Layout>

  )
}
