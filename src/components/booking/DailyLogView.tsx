// src/components/booking/DailyLogView.tsx
import React, { useState, useMemo } from 'react';
import { Reservation } from '../../types';

interface Props {
  reservations: Reservation[];
}

export default function DailyLogView({ reservations }: Props) {
  const today = new Date();
  const [filterDate, setFilterDate] = useState({
    day: today.getDate(),
    month: today.getMonth() + 1, // Meses son 0-indexados, así que sumamos 1
    year: today.getFullYear(),
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilterDate(prev => ({ ...prev, [e.target.name]: parseInt(e.target.value) }));
  };

  const filteredReservations = useMemo(() => {
    return reservations.filter(res => {
      // Solo nos interesan las reservas que fueron 'checked-in'
      if (res.status !== 'checked-in' && res.status !== 'checked-out') {
        return false;
      }
      
      const checkInDate = res.checkIn.toDate();
      return (
        checkInDate.getDate() === filterDate.day &&
        checkInDate.getMonth() + 1 === filterDate.month &&
        checkInDate.getFullYear() === filterDate.year
      );
    });
  }, [reservations, filterDate]);

  // Generadores para los options de los selectores
  const years = Array.from({ length: 5 }, (_, i) => today.getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-semibold mb-4 text-gray-700">Registros de Ocupación</h3>
      
      {/* Filtros de Fecha */}
      <div className="flex flex-wrap gap-4 items-center mb-6 p-4 bg-gray-50 rounded-lg">
        <label className="font-medium">Filtrar por fecha:</label>
        <select name="day" value={filterDate.day} onChange={handleFilterChange} className="p-2 border rounded-md">
          {days.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select name="month" value={filterDate.month} onChange={handleFilterChange} className="p-2 border rounded-md">
          {months.map(m => <option key={m} value={m}>{new Date(0, m - 1).toLocaleString('es-MX', { month: 'long' })}</option>)}
        </select>
        <select name="year" value={filterDate.year} onChange={handleFilterChange} className="p-2 border rounded-md">
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      {/* Tabla de Registros */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-stone-800 text-white uppercase">
            <tr>
              <th scope="col" className="px-4 py-3">Hab.</th>
              <th scope="col" className="px-4 py-3">Entrada</th>
              <th scope="col" className="px-4 py-3">Vehículo</th>
              <th scope="col" className="px-4 py-3">Precio</th>
              <th scope="col" className="px-4 py-3">H. Entrada</th>
              <th scope="col" className="px-4 py-3">H. Salida</th>
              <th scope="col" className="px-4 py-3">Comentarios</th>
            </tr>
          </thead>
           <tbody>
            {filteredReservations.length > 0 ? (
              filteredReservations.map(res => {
                // Lógica para mostrar el tipo de vehículo
                let vehicleText = 'A pie';
                if (res.walkInDetails?.vehicleType === 'auto') vehicleText = 'Auto';
                if (res.walkInDetails?.vehicleType === 'moto') vehicleText = 'Moto';

                return (
                  <tr key={res.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-bold">{res.roomNumber}</td>
                    <td className="px-4 py-3">{vehicleText}</td>
                    <td className="px-4 py-3">
                      {['auto', 'moto'].includes(res.walkInDetails?.vehicleType || '') ? 
                        `${res.walkInDetails?.carModel || ''} ${res.walkInDetails?.carColor || ''} - ${res.walkInDetails?.licensePlate || ''}` 
                       : 'N/A'}
                    </td>
                    <td className="px-4 py-3 font-medium text-green-600">${res.price}</td>
                    <td className="px-4 py-3">{res.checkIn.toDate().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="px-4 py-3">
                      {res.status === 'checked-out' && res.checkOut ? 
                       res.checkOut.toDate().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }) 
                       : 'Pendiente'}
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate">{res.walkInDetails?.comments || 'Sin comentarios'}</td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">No se encontraron registros para la fecha seleccionada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}