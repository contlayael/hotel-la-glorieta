// src/components/booking/CountdownTimer.tsx
import React, { useState, useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';

interface Props {
  checkOutTime: Timestamp;
}

export default function CountdownTimer({ checkOutTime }: Props) {
  const calculateRemainingTime = () => {
    const now = new Date().getTime();
    const checkout = checkOutTime.toDate().getTime();
    return checkout - now;
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000); // Actualiza cada segundo

    // Limpia el intervalo cuando el componente se desmonta para evitar fugas de memoria
    return () => clearInterval(timer);
  }, [checkOutTime]);

  // Si el tiempo se acabó, muestra "Tiempo Finalizado"
  if (remainingTime <= 0) {
    return <div className="text-sm font-bold text-white bg-red-600 px-2 py-1 rounded">Tiempo Finalizado</div>;
  }

  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
  const seconds = Math.floor((remainingTime / 1000) % 60);

  // Lógica para cambiar de color
  let bgColor = 'bg-green-500'; // Normal (más de 2 horas)
  if (hours < 2) {
    bgColor = 'bg-yellow-500'; // Alerta (entre 1 y 2 horas)
  }
  if (hours < 1) {
    bgColor = 'bg-red-500'; // Urgente (menos de 1 hora)
  }

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className={`text-sm font-bold text-white ${bgColor} px-2 py-1 rounded-full transition-colors duration-500`}>
      {formattedTime}
    </div>
  );
}