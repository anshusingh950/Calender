import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Company Communication Tracker</h1>
      <nav>
        <Link to="/admin/company-management">Admin</Link>
        <Link to="/user/dashboard">User Dashboard</Link>
      </nav>
    </header>
  );
};

export default Header;
