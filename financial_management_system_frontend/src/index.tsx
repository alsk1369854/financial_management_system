import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { HashRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd';

import locale from 'antd/locale/zh_TW'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider locale={locale}>
      <HashRouter>
        <App />
      </HashRouter>
    </ConfigProvider>
  </React.StrictMode>
);

