import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return user && (user.role === 'admin' || user.role === 'vendor') ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminRoute;
