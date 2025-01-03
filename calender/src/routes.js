import React from 'react';
import {Route, Routes} from "react-router-dom";
import CompanyManagement from '../src/components/AdminModule/CompanyManagement';
import Dashboard from '../src/components/UserModule/Dashboard';

const Routes1 = () => {
  return (
      <Routes>
        <Route path="/admin"  element={<CompanyManagement/>}  />
        <Route path="/user"  element={<Dashboard/>}  />
      </Routes>
  );
};

export default Routes1;
