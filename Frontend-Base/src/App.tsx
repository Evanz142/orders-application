import React from 'react';
import { Routes, Route } from 'react-router-dom';

import OrdersPage from './pages/Orders';
import StatisticsPage from './pages/Statistics';
import DemoPage from './pages/Demo';
import LoginPage from './pages/Login';
import { SessionProvider } from './contexts/SessionContext';
import { UserProvider } from './contexts/UserContext';
import PrivateRoute from './components/PrivateRoute';
import SignupPage from './pages/Signup';
import ForgotPasswordPage from './pages/ForgotPassword';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { useUserContext } from './contexts/UserContext';

export default function App() {

  return (
    <div className="App">
      <SessionProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="home"
              element={
                <PrivateRoute>
                    <OrdersPage />
                </PrivateRoute>
              }
            />
            <Route
              path="stats"
              element={
                <PrivateRoute>
                  <StatisticsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="bruh"
              element={
                <PrivateRoute>
                  <DemoPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </UserProvider>
      </SessionProvider>
    </div>
  );
}
