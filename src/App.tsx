import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';

// Placeholder components for routes that will be implemented later
const Experiments = () => <div className="p-10 text-slate-600">Experiments Page (Coming Soon)</div>;
const Journal = () => <div className="p-10 text-slate-600">Journal Page (Coming Soon)</div>;
const Achievements = () => <div className="p-10 text-slate-600">Achievements Page (Coming Soon)</div>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app" replace />} />
      
      {/* App Shell Layout */}
      <Route path="/app" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="experiments" element={<Experiments />} />
        <Route path="journal" element={<Journal />} />
        <Route path="achievements" element={<Achievements />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<div className="flex h-screen items-center justify-center text-slate-500">404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;
