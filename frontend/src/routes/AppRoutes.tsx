import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { LandingPage } from '@/pages/LandingPage';
import { BillsPage } from '@/pages/BillsPage';
import { BillDetailPage } from '@/pages/BillDetailPage';
import { CalculatePage } from '@/pages/CalculatePage';
import { DashboardPage } from '@/pages/DashboardPage';
import { HistoryPage } from '@/pages/HistoryPage';
import { ProfilesPage } from '@/pages/ProfilesPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { AdminPage } from '@/pages/AdminPage';
import { LoginPage } from '@/pages/LoginPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/bills" element={<BillsPage />} />
      <Route path="/bills/:id" element={<BillDetailPage />} />
      <Route path="/calculate" element={<CalculatePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/profiles" element={<ProfilesPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
