import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';

export default function AuthLayout() {
  return (
    <Routes>
      {/* Login Page */}
      <Route path="login" element={<SignIn />} />
    </Routes>
  );
}
