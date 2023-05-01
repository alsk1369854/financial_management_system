import React, { FC } from 'react'
import { HeaderLayout } from '../layout/HeaderLayout';
import { Route, Routes } from 'react-router-dom';
import { CustomerFinancialTable } from '../../components/CustomerFinancialTable';
import { Row } from 'antd';


export const HomePage: FC = () => {


  return (
    <div>
      <HeaderLayout />
      <Row
        justify="center"
        align="middle"
        style={{
          padding: "20px 20px"
        }}
      >
        <Routes>
          <Route path='/' element={<CustomerFinancialTable />} />
        </Routes>
      </Row>

    </div >
  )
}
