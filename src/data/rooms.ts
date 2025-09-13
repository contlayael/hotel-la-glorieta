import { Room } from "../types";

// --- Datos Fijos del Hotel ---
export const ROOMS_DATA: Room[] = [
    // Habitaciones Sencillas ($350)
    { id: '01', number: '01', type: 'Sencilla', price: 350, capacity: 2 },
    { id: '02', number: '02', type: 'Sencilla', price: 350, capacity: 2 },
    { id: '03', number: '03', type: 'Sencilla', price: 350, capacity: 2 },
    { id: '04', number: '04', type: 'Sencilla', price: 350, capacity: 2 },
    { id: '05', number: '05', type: 'Sencilla', price: 350, capacity: 2 },
    { id: '06', number: '06', type: 'Sencilla', price: 350, capacity: 2 },
    { id: '07', number: '07', type: 'Sencilla', price: 350, capacity: 2 },
    { id: '08', number: '08', type: 'Sencilla', price: 350, capacity: 2 },
    { id: '09', number: '09', type: 'Tubo', price: 350, capacity: 2 },
    { id: '10', number: '10', type: 'Tubo', price: 350, capacity: 2 },
    { id: '11', number: '11', type: 'Tubo', price: 350, capacity: 2 },
    { id: '12', number: '12', type: 'Sencilla', price: 350, capacity: 2 },
    { id: '13', number: '13', type: 'Sencilla', price: 350, capacity: 2 },
    { id: '14', number: '14', type: 'Sencilla', price: 350, capacity: 2 },
    // Habitaciones Dobles ($600)
    { id: '15', number: '15', type: 'Doble', price: 600, capacity: 4 },
    { id: '16', number: '16', type: 'Doble', price: 600, capacity: 4 },
];

export const HOLD_DURATION_MINUTES = 5;
