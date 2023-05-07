import React from 'react';
import { CustomerFinancialPage } from './pages/CustomerFinancialPage';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path='/customer-financial' element={<CustomerFinancialPage />} />
        <Route path='/home' element={<>Home</>} />
        <Route path='*' element={<Navigate to='/customer-financial' />} />
      </Routes>
    </div>
  );
};

export default App;