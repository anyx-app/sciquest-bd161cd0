import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import Experiments from './pages/Experiments';
import Journal from './pages/Journal';
import Achievements from './pages/Achievements';

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

