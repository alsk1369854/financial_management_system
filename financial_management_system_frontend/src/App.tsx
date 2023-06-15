import React, { useEffect, useState } from 'react';
import { CustomerFinancialPage } from './pages/CustomerFinancialPage';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { darkThemeStyleData, defaultThemeStyleData, lightThemeStyleData } from './configs/ThemeStyleConfig';
import { ThemeStyleDataInterface } from './interfaces/ThemeStyleInterface';
import { ConfigProvider } from 'antd';
import functionCaller from 'function-caller/dist/FunctionCaller';
import { useThemeStyle } from './hooks/ThemeStyle';
import { ThemeEnum } from './enums/ThemeStyle';
import { Message } from './components/Message';

export const FC_KEY_themeStyleSwitch = 'FC_KEY_themeStyleSwitch';

const App: React.FC = () => {

  const { theme, setThemeStyle, themeStyleData } = useThemeStyle(ThemeEnum.dark);

  useEffect(() => {
    functionCaller.set(FC_KEY_themeStyleSwitch, themeStyleSwitch);
    return () => {
      functionCaller.remove(FC_KEY_themeStyleSwitch);
    };
  });

  const themeStyleSwitch = () => {
    const newThemeStyle = (theme === ThemeEnum.light) ?
      ThemeEnum.dark : ThemeEnum.light;

    setThemeStyle(newThemeStyle)
  };

  return (
    <div>
      <ConfigProvider theme={{
        token: themeStyleData,
      }}>
        <Message />
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