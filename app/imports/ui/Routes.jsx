import React from 'react';
import { Route, Routes } from 'react-router';
import CoinsPage from './CoinsPage.jsx';
import HomePage from './HomePage.jsx';

export default () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/coins" element={<CoinsPage />} />
  </Routes>
);
