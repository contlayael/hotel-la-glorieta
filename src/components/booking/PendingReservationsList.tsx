// src/components/booking/PendingReservationsList.tsx
import React, { useState } from 'react'; // 1. Importamos useState
import { Reservation } from '../../types';

interface Props {
  reservations: Reservation[];
  onUpdate: (id: string, newStatus: 'confirmed' | 'cancelada', paymentStatus?: string) => void;
}

export default function PendingReservationsList({ reservations, onUpdate }: Props) {
  // 2. Creamos un estado para guardar la selección de pago para cada reserva
  const [paymentSelections, setPaymentSelections] = useState<{ [key: string]: string }>({});

  const handleSelectionChange = (reservationId: string, paymentValue: string) => {
    setPaymentSelections(prev => ({
      ...prev,
      [reservationId]: paymentValue,
    }));
  };

  const handleConfirm = (reservationId: string) => {
    const paymentStatus = paymentSelections[reservationId];
    if (!paymentStatus) {
      alert('Por favor, seleccione un método de pago antes de confirmar.');
      return;
    }
    onUpdate(reservationId, 'confirmed', paymentStatus);
  };

  if (reservations.length === 0) {
    return <p className="text-gray-600">No hay solicitudes de reservación pendientes.</p>;
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {reservations.map(res => (
        <div key={res.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div>
              <p className="font-bold text-lg text-stone-800">Habitación {res.roomNumber}</p>
              <p className="text-sm text-gray-600">Cliente: {res.customerName}</p>
              <p className="text-sm text-gray-600">Tel: {res.customerPhone}</p>
            </div>
            <div>
              <p className="font-semibold">Check-in</p>
              <p>{res.checkIn?.toDate().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
            </div>
            <div className="font-semibold">
              <p>${res.price} / noche</p>
            </div>
            <div className="flex flex-col gap-2">
              {/* 3. El <select> ahora solo actualiza el estado local */}
              <select 
                onChange={(e) => handleSelectionChange(res.id, e.target.value)}
                className="p-2 border border-gray-300 rounded-lg bg-white focus:ring-amber-500"
                value={paymentSelections[res.id] || ""} // Controlamos el valor con el estado
              >
                <option value="" disabled>Seleccione un pago...</option>
                <option value="pago-parcial">Pago Parcial</option>
                <option value="pago-total">Pago Total</option>
                <option value="pago-en-llegada">Pago en Llegada</option>
              </select>
              {/* 4. Un nuevo botón para confirmar la acción */}
              <button onClick={() => handleConfirm(res.id)} className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                Confirmar
              </button>
              <button onClick={() => onUpdate(res.id, 'cancelada')} className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                Rechazar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}