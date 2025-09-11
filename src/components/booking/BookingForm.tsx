// src/components/booking/BookingForm.tsx
import React, { useState, useEffect } from 'react';
import { db, updateDoc, doc } from '../../services/firebase';

// 1. Añadimos 'onSuccess' a las props que recibe el componente
interface BookingFormProps {
  room: any;
  holdId: string;
  onCancel: () => void;
  onSuccess: () => void; // Nueva prop para manejar el éxito
  selectedDate: Date;
}

export default function BookingForm({ room, holdId, onCancel, onSuccess, selectedDate }: BookingFormProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [timeLeft, setTimeLeft] = useState(5 * 60);

    useEffect(() => {
        if (timeLeft <= 0) {
            onCancel();
            alert("El tiempo para reservar ha expirado. La habitación ha sido liberada.");
            return;
        }
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, onCancel]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !phone) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const reservationRef = doc(db, `reservations/${holdId}`);
        try {
            await updateDoc(reservationRef, {
                status: 'pending',
                customerName: name,
                customerPhone: phone,
            });
            alert("¡Solicitud enviada! Nos pondremos en contacto contigo para confirmar.");
            
            // 2. Llamamos a la nueva función 'onSuccess' en lugar de 'onCancel'
            onSuccess(); 

        } catch (error) {
            console.error("Error al enviar la reservación:", error);
            alert("Ocurrió un error. Por favor, intente de nuevo.");
        }
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto animate-fade-in">
            <div className="text-center mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
                <p className="font-semibold text-yellow-800">
                    Tiempo restante: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </p>
            </div>
            <h2 className="text-2xl font-bold mb-1">Reservar Habitación {room.number}</h2>
            <p className="text-gray-600 mb-6">
                Fecha de entrada: {selectedDate.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Nombre Completo</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Teléfono</label>
                    <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500" required />
                </div>
                <div className="flex gap-4">
                    <button type="button" onClick={onCancel} className="w-full py-3 px-4 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300">Cancelar</button>
                    <button type="submit" className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-amber-600 hover:bg-amber-700">Enviar Solicitud</button>
                </div>
            </form>
        </div>
    );
}