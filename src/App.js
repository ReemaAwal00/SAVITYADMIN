import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from './theme/theme'; 
import { useState } from 'react';
import SignIn from 'views/auth/signIn';

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        {/* Routes for authentication */}
        <Route path="auth/*" element={<AuthLayout />} />

        {/* Routes for admin */}
        <Route
          path="admin/*"
          element={
            <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />

        {/* Redirect root to login page */}
        <Route path="/" element={<SignIn replace />} />
      </Routes>
    </ChakraProvider>
  );
}
