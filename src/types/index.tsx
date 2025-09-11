// src/types/index.ts
import { Timestamp } from 'firebase/firestore';

export interface Room {
  id: string;
  number: string;
  type: string;
  price: number;
  capacity: number;
}

export interface Reservation {
  id: string;
  roomId: string;
  roomNumber: string;
  status: 'hold' | 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelada';
  checkIn: Timestamp;
  checkOut?: Timestamp; // Para el checkout
  holdExpires?: Timestamp;
  customerName?: string;
  customerPhone?: string;
  paymentStatus?: 'pago-parcial' | 'pago-total' | 'pago-en-llegada';
   walkInDetails?: {
    vehicleType: 'pie' | 'auto' | 'moto'; 
    carColor?: string;
    licensePlate?: string;
    carModel?: string; // Nuevo
    stayType: 'noche' | 'horas'; // Nuevo
    comments?: string;
  };
  [key: string]: any; 
}