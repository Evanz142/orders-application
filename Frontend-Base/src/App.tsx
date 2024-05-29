import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import OrdersPage from './pages/Orders';
import StatisticsPage from './pages/Statistics';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<OrdersPage />} />
        <Route path="stats" element={<StatisticsPage />} />
      </Routes>
    </div>
  );
}