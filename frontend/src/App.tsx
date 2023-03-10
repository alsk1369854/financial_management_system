import React from 'react';
import { Layout, theme } from 'antd';

import { PageHeader } from './layout/PageHeader';
import { CompanyListPage } from './pages/CompanyListPage';



const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <PageHeader />
      <CompanyListPage colorBgContainer={colorBgContainer}></CompanyListPage>
    </Layout>
  );
};

export default App;