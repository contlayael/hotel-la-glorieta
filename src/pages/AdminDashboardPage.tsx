// src/pages/AdminDashboardPage.tsx
import React from 'react';
import AdminView from '../components/booking/AdminView'; // Reutilizamos el panel
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboardPage() {
    const auth = getAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/admin'); // Redirige al login al cerrar sesión
        });
    };

    return (
        <div className="bg-stone-100 min-h-screen">
            <header className="bg-white shadow-md">
                <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-stone-800">Panel de Control</h1>
                    <button onClick={handleLogout} className="px-4 py-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600">
                        Cerrar Sesión
                    </button>
                </nav>
            </header>
            <main className="p-4 md:p-8">
                <AdminView />
            </main>
        </div>
    );
}