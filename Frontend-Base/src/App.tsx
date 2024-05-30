import React from 'react';
import { Routes, Route } from 'react-router-dom';

import OrdersPage from './pages/Orders';
import StatisticsPage from './pages/Statistics';
import LoginPage from './pages/Login';
import { SessionProvider } from './contexts/SessionContext';
import PrivateRoute from './components/PrivateRoute';
import SignupPage from './pages/Signup';
import ForgotPasswordPage from './pages/ForgotPassword';

export default function App() {
  return (
    <div className="App">
      <SessionProvider>
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
        </Routes>
      </SessionProvider>
    </div>
  );
}
