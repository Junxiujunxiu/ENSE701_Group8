// src/pages/admin/index.tsx
import React from 'react';
import PrivateRoute from '../../components/PrivateRoute'; // Import PrivateRoute
import AdminPage from './AdminPage'; // Import your existing AdminPage component

const Admin = () => {
  return (
    <PrivateRoute>
      <AdminPage />
    </PrivateRoute>
  );
};

export default Admin;
