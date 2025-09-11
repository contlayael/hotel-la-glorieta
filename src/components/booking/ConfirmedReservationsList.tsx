// src/components/booking/ConfirmedReservationsList.tsx
import React, { useState } from 'react';
import { Reservation } from '../../types';
import CountdownTimer from './CountdownTimer';

interface Props {
  reservations: Reservation[];
  onUpdate: (id: string, newStatus: 'checked-in' | 'checked-out' | 'cancelada') => void;
}

// La tarjeta de reserva se queda igual
const ReservationCard = ({ res, onUpdate }: { res: Reservation; onUpdate: Props['onUpdate'] }) => {
  const isFourHourStay = res.walkInDetails?.stayType === 'horas';
  const isCheckedIn = res.status === 'checked-in';
  
  return (
    <div className={`p-4 rounded-lg border ${isCheckedIn ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-200'}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div>
          <p className="font-bold text-lg">Habitación {res.roomNumber}</p>
          {res.customerName && <p className="text-sm">Cliente: {res.customerName}</p>}
          {isFourHourStay && isCheckedIn && res.checkOut && (
            <div className="mt-2"><CountdownTimer checkOutTime={res.checkOut} /></div>
          )}
        </div>
        <div>
          <p className="font-semibold">Check-in</p>
          <p>{res.checkIn?.toDate().toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })}</p>
        </div>
        <div>
          <p className="font-semibold capitalize">Estado: {isCheckedIn ? 'Ocupada' : res.status}</p>
          {res.paymentStatus && <p className="text-sm capitalize">Pago: {res.paymentStatus.replace('-', ' ')}</p>}
        </div>
        <div className="flex flex-col gap-2">
          {res.status === 'confirmed' && <button onClick={() => onUpdate(res.id, 'checked-in')} className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">Marcar Check-in</button>}
          {isCheckedIn && <button onClick={() => onUpdate(res.id, 'checked-out')} className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Marcar Check-out</button>}
          <button onClick={() => onUpdate(res.id, 'cancelada')} className="bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">Cancelar Reserva</button>
        </div>
      </div>
    </div>
  );
};

export default function ConfirmedReservationsList({ reservations, onUpdate }: Props) {
  const [subView, setSubView] = useState('today');
  const todayString = new Date().toDateString();

  const reservationsToday = reservations.filter(res => 
    res.checkIn.toDate().toDateString() === todayString
  );

  const upcomingReservations = reservations.filter(res => 
    res.checkIn.toDate().toDateString() !== todayString
  );

  return (
    <div className="animate-fade-in">
      {/* 👇 PESTAÑAS MODIFICADAS CON LOS CONTADORES 👇 */}
      <div className="flex gap-4 border-b mb-6">
        <button 
          onClick={() => setSubView('today')} 
          className={`pb-2 font-medium flex items-center gap-2 ${subView === 'today' ? 'border-b-2 border-stone-700 text-stone-800' : 'text-gray-500'}`}
        >
          <span>Ocupadas y Llegadas de Hoy</span>
          <span className="bg-green-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
            {reservationsToday.length}
          </span>
        </button>
        <button 
          onClick={() => setSubView('upcoming')} 
          className={`pb-2 font-medium flex items-center gap-2 ${subView === 'upcoming' ? 'border-b-2 border-stone-700 text-stone-800' : 'text-gray-500'}`}
        >
          <span>Próximas Llegadas</span>
          <span className="bg-blue-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
            {upcomingReservations.length}
          </span>
        </button>
      </div>

      {/* El contenido dinámico se queda igual */}
      {subView === 'today' && (
        <div className="space-y-4">
          {reservationsToday.length > 0 ? (
            reservationsToday.map(res => <ReservationCard key={res.id} res={res} onUpdate={onUpdate} />)
          ) : (
            <p className="text-gray-600">No hay habitaciones ocupadas o llegadas programadas para hoy.</p>
          )}
        </div>
      )}

      {subView === 'upcoming' && (
        <div className="space-y-4">
          {upcomingReservations.length > 0 ? (
            upcomingReservations.map(res => <ReservationCard key={res.id} res={res} onUpdate={onUpdate} />)
          ) : (
            <p className="text-gray-600">No hay próximas reservaciones.</p>
          )}
        </div>
      )}
    </div>
  );
}