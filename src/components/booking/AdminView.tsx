// src/components/booking/AdminView.tsx
import React, { useState, useEffect } from 'react';
import { db, collection, onSnapshot, doc, updateDoc, query } from '../../services/firebase';
import { Reservation } from '../../types';
import PendingReservationsList from './PendingReservationsList';
import ConfirmedReservationsList from './ConfirmedReservationsList';
import WalkInForm from './WalkInForm';
import DailyLogView from './DailyLogView';

// 1. (NUEVO) Definimos un tipo para los posibles estados que puede actualizar el admin.
type UpdatableStatus = 'confirmed' | 'cancelada' | 'checked-in' | 'checked-out';

export default function AdminView() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [currentView, setCurrentView] = useState('pending');

  useEffect(() => {
    const q = query(collection(db, "reservations"));
    const unsubscribe = onSnapshot(q, snapshot => {
      const resData = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Reservation[];
      resData.sort((a, b) => (b.createdAt?.toDate() ?? 0) > (a.createdAt?.toDate() ?? 0) ? 1 : -1);
      setReservations(resData);
    });
    return unsubscribe;
  }, []);

  // 2. (CORREGIDO) Añadimos los tipos a los parámetros de la función.
  const handleUpdateStatus = async (
    id: string, 
    newStatus: UpdatableStatus, 
    paymentStatus: string | null = null
  ) => {
    const resRef = doc(db, "reservations", id);
    let updateData: any = { status: newStatus };
     // Si el nuevo estado es 'checked-out', actualizamos la hora de salida
    // con la hora EXACTA en que se presionó el botón. Esto SOBREESCRIBE 
    // la hora de salida provisional que se calculó al registrar la llegada.
    if (newStatus === 'checked-out') {
        updateData.checkOut = new Date();
    }
    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }
    await updateDoc(resRef, updateData);
  };

  const pendingReservations = reservations.filter(r => r.status === 'pending');
  const confirmedReservations = reservations.filter(r => ['confirmed', 'checked-in'].includes(r.status));

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administración</h2>
      <div className="flex border-b mb-6">
        <button onClick={() => setCurrentView('pending')} className={`py-2 px-4 text-lg font-medium ${currentView === 'pending' ? 'border-b-2 border-amber-600 text-amber-600' : 'text-gray-500'}`}>
          Pendientes <span className="bg-yellow-400 text-yellow-800 rounded-full px-2 py-0.5 text-sm">{pendingReservations.length}</span>
        </button>
        <button onClick={() => setCurrentView('confirmed')} className={`py-2 px-4 text-lg font-medium ${currentView === 'confirmed' ? 'border-b-2 border-amber-600 text-amber-600' : 'text-gray-500'}`}>
          Confirmadas y Activas
        </button>
        <button onClick={() => setCurrentView('walkin')} className={`py-2 px-4 text-lg font-medium ${currentView === 'walkin' ? 'border-b-2 border-amber-600 text-amber-600' : 'text-gray-500'}`}>
          Registrar Llegada
        </button>
         <button onClick={() => setCurrentView('log')} className={`py-2 px-4 text-lg font-medium ${currentView === 'log' ? 'border-b-2 border-amber-600 text-amber-600' : 'text-gray-500'}`}>
          Registros del Día
        </button>
      </div>
      
      {/* Esta línea ahora funcionará sin errores */}
      {currentView === 'pending' && <PendingReservationsList reservations={pendingReservations} onUpdate={handleUpdateStatus} />}
      {currentView === 'confirmed' && <ConfirmedReservationsList reservations={confirmedReservations} onUpdate={handleUpdateStatus} />}
      {currentView === 'walkin' && <WalkInForm allReservations={reservations} />}
      {currentView === 'log' && <DailyLogView reservations={reservations} />}
    </div>
  );
}