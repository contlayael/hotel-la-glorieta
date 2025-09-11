// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; // Necesitaremos esta librería
import { getAuth } from 'firebase/auth';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { hotelInfo, navLinks } from './data/hotelData.tsx';

// Para instalar react-firebase-hooks: npm install react-firebase-hooks

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div>Cargando...</div>; // O un spinner
    }
    if (!user) {
        return <Navigate to="/admin" />; // Si no hay usuario, redirige al login
    }
    return children; // Si hay usuario, muestra el contenido
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/*" element={
            <div className="bg-stone-50 text-stone-800 font-sans">
                <Header navLinks={navLinks} />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/reservar" element={<BookingPage />} />
                </Routes>
                <Footer info={hotelInfo} />
            </div>
        } />

        {/* Rutas de Administración */}
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/dashboard" element={
            <ProtectedRoute>
                <AdminDashboardPage />
            </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;