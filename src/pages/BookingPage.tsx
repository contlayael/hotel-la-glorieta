// src/pages/BookingPage.tsx
import React, { useState, useEffect } from 'react';
import { auth, onAuthStateChanged, signInAnonymously } from '../services/firebase';
import { User } from 'firebase/auth';
import CustomerView from '../components/booking/CustomerView';

export default function BookingPage() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                signInAnonymously(auth).catch(console.error);
            }
            setUser(currentUser);
        });
    }, []);

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen bg-stone-50">
                <div className="text-xl font-semibold text-stone-700">Cargando sistema de reservas...</div>
            </div>
        );
    }

    return (
        <div className="bg-stone-100 font-sans min-h-screen p-4 md:p-8">
            <CustomerView />
        </div>
    );
}