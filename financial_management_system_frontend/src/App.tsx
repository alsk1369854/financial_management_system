import React, { useEffect, useState } from 'react';
import { CustomerFinancialPage } from './pages/CustomerFinancialPage';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { darkThemeStyleData, defaultThemeStyleData, lightThemeStyleData } from './configs/ThemeStyleConfig';
import { ThemeStyleDataInterface } from './interfaces/ThemeStyleInterface';
import { ConfigProvider } from 'antd';
import functionCaller from 'function-caller/dist/FunctionCaller';

export const FC_KEY_themeStyleSwitch = 'FC_KEY_themeStyleSwitch';

const App: React.FC = () => {

  const [count, setCount] = useState(0)
  const [themeStyleData, setThemeStyleData] = useState<ThemeStyleDataInterface>(defaultThemeStyleData);

  useEffect(() => {
    if (count === 0) {
      init();
      setCount(count => ++count);
    }
    functionCaller.set(FC_KEY_themeStyleSwitch, themeStyleSwitch);
    return () => {
      functionCaller.remove(FC_KEY_themeStyleSwitch);
    };
  });

  const init = () => {
    setGlobalCssStyle(themeStyleData);
  }

  const themeStyleSwitch = () => {
    const newThemeStyleData = (themeStyleData === darkThemeStyleData) ? lightThemeStyleData : darkThemeStyleData;
    setThemeStyleData(newThemeStyleData);
    setGlobalCssStyle(newThemeStyleData);
  };

  const setGlobalCssStyle = (themeStyleData: ThemeStyleDataInterface) => {
    document.documentElement.style.setProperty('--body-bg-color', themeStyleData.bodyBgColor);
    document.documentElement.style.setProperty('--scroll-bg-color', themeStyleData.scrollBgColor);
  }


  return (
    <div>
      <ConfigProvider theme={{
        token: themeStyleData,
      }}>
        <Routes>
          <Route path='/customer-financial' element={<CustomerFinancialPage />} />
          <Route path='/home' element={<>Home</>} />
          <Route path='*' element={<Navigate to='/customer-financial' />} />
        </Routes>
      </ConfigProvider>
    </div>
  );
};

export default App;