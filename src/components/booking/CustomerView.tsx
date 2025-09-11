// src/components/booking/CustomerView.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { db, collection, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc, query } from '../../services/firebase';
import { ROOMS_DATA } from '../../data/hotelData.tsx';
import BookingForm from './BookingForm';
import { Room, Reservation } from '../../types'; // Importamos desde el archivo de tipos

export default function CustomerView() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [holdId, setHoldId] = useState<string | null>(null);

    // ... (useEffect y isRoomAvailable se quedan igual) ...
    useEffect(() => {
        const q = query(collection(db, "reservations"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const resData = snapshot.docs.map(d => ({
                 id: d.id, ...d.data() 
            })) as Reservation[];
            setReservations(resData);
        });
        return unsubscribe;
    }, []);

    const isRoomAvailable = useCallback((room: Room, date: Date) => {
        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);

        return !reservations.some(res => {
            if (res.roomId !== room.id || ['cancelada', 'checked-out'].includes(res.status)) return false;
            if (res.status === 'hold' && res.holdExpires && res.holdExpires.toDate() < new Date()) return false;
            
            const resDate = res.checkIn.toDate();
            resDate.setHours(0, 0, 0, 0);
            return checkDate.getTime() === resDate.getTime();
        });
    }, [reservations]);


    const handleRoomSelect = async (room: Room) => {
        if (!isRoomAvailable(room, selectedDate)) return;

        const checkIn = new Date(selectedDate);
        checkIn.setHours(15, 0, 0, 0);

        const newHold = {
            roomId: room.id,
            roomNumber: room.number,
            status: 'hold' as const,
            createdAt: serverTimestamp(),
            holdExpires: new Date(Date.now() + 5 * 60000),
            checkIn: checkIn,
            price: room.price
        };

        try {
            const docRef = await addDoc(collection(db, "reservations"), newHold);
            setHoldId(docRef.id);
            setSelectedRoom(room);
        } catch (error) {
            console.error("Error al apartar habitación:", error);
        }
    };

    // Esta función SÍ BORRA la reserva (para el botón Cancelar)
    const handleCancelBooking = async () => {
        if (holdId) {
            await deleteDoc(doc(db, "reservations", holdId));
        }
        setSelectedRoom(null);
        setHoldId(null);
    };

    // 1. (NUEVA FUNCIÓN) Esta función solo limpia la pantalla, NO BORRA NADA.
    const handleBookingSuccess = () => {
        setSelectedRoom(null);
        setHoldId(null);
    };

    if (selectedRoom && holdId) {
        // 2. Pasamos ambas funciones al formulario con sus props correctas
        return (
            <BookingForm 
                room={selectedRoom} 
                holdId={holdId} 
                onCancel={handleCancelBooking} // Para el botón de cancelar
                onSuccess={handleBookingSuccess} // Para cuando la reserva es exitosa
                selectedDate={selectedDate} 
            />
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Reserve su Habitación</h2>
            {/* ... (el resto del JSX se queda igual) ... */}
            <p className="text-gray-600 mb-6">Seleccione una fecha para ver la disponibilidad.</p>
            <input
                type="date"
                className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-amber-500"
                value={selectedDate.toISOString().split('T')[0]}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setSelectedDate(new Date(e.target.value))}
            />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {ROOMS_DATA.map(room => {
                    const available = isRoomAvailable(room, selectedDate);
                    return (
                        <div key={room.id} className={`p-5 rounded-lg border-2 ${available ? 'border-gray-200' : 'bg-gray-100 border-gray-300'}`}>
                            <h3 className="text-xl font-semibold text-gray-900">{`Habitación ${room.number}`}</h3>
                            <p className="text-gray-500">{room.type}</p>
                            <p className="text-2xl font-bold text-amber-700 mt-2">${room.price} <span className="text-sm font-normal text-gray-500">/ noche</span></p>
                            <button
                                onClick={() => handleRoomSelect(room)}
                                disabled={!available}
                                className="w-full mt-4 py-2 px-4 rounded-lg font-semibold text-white transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed bg-amber-600 hover:bg-amber-700"
                            >
                                {available ? 'Reservar' : 'Ocupada'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}