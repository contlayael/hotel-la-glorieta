// src/components/booking/WalkInForm.tsx
import React, { useState, useMemo } from 'react';
import { db, addDoc, collection, serverTimestamp } from '../../services/firebase';
import { ROOMS_DATA } from '../../data/hotelData.tsx';
import { Reservation } from '../../types';

const initialState = {
    roomId: '',
    vehicleType: 'pie' as 'pie' | 'auto',
    carColor: '',
    licensePlate: '',
    carModel: '',
    stayType: 'noche' as 'noche' | 'horas',
    comments: '',
};

export default function WalkInForm({ allReservations }: { allReservations: Reservation[] }) {
    const [formData, setFormData] = useState(initialState);
    const [success, setSuccess] = useState('');

    // LÓGICA PARA CALCULAR HABITACIONES DISPONIBLES (RE-AGREGADA)
 const availableRooms = useMemo(() => {
        const todayString = new Date().toDateString();

        // Obtenemos los IDs de las habitaciones que tienen una reserva confirmada o activa PARA HOY
        const occupiedRoomIds = allReservations
            .filter(res => 
                (['confirmed', 'checked-in'].includes(res.status)) &&
                (res.checkIn.toDate().toDateString() === todayString)
            )
            .map(res => res.roomId);
            
        return ROOMS_DATA.filter(room => !occupiedRoomIds.includes(room.id));
    }, [allReservations]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const room = ROOMS_DATA.find(r => r.id === formData.roomId);
        if (!room) {
            alert("Por favor, seleccione una habitación válida.");
            return;
        }

        const checkIn = new Date();
        const checkOut = new Date(checkIn);
        if (formData.stayType === 'noche') {
            checkOut.setDate(checkOut.getDate() + 1);
            checkOut.setHours(12, 0, 0, 0);
        } else {
            checkOut.setHours(checkOut.getHours() + 4);
        }

        const newReservation: Omit<Reservation, 'id'> = {
            roomId: room.id,
            roomNumber: room.number,
            status: 'checked-in',
            checkIn: checkIn,
            checkOut: checkOut,
           price: formData.stayType === 'noche' ? room.price : 200, // If 'noche', use the room's price (350 or 600). If not, use 200.
            paymentStatus: 'pago-en-llegada',
            createdAt: serverTimestamp(),
            walkInDetails: {
                vehicleType: formData.vehicleType,
                carColor: formData.carColor,
                licensePlate: formData.licensePlate,
                carModel: formData.carModel,
                stayType: formData.stayType,
                comments: formData.comments,
            }
        };

        try {
            await addDoc(collection(db, "reservations"), newReservation);
            setSuccess(`Habitación ${room.number} registrada.`);
            setFormData(initialState);
            setTimeout(() => setSuccess(''), 4000);
        } catch (err) { console.error(err); }
    };

    return (
        <div className="animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Registrar Llegada</h3>
            {success && <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">{success}</p>}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
                
                {/* SELECTOR DE HABITACIÓN (RE-AGREGADO) */}
                <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-1">Habitación Disponible</label>
                    <select 
                        name="roomId" 
                        value={formData.roomId} 
                        onChange={e => setFormData({...formData, roomId: e.target.value})} 
                        className="w-full p-2 border rounded-md bg-white" required>
                        <option value="">Seleccione una habitación...</option>
                        {availableRooms.map(r => <option key={r.id} value={r.id}>{r.number} ({r.type})</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Tipo de Estancia</label>
                    <select name="stayType" value={formData.stayType} onChange={e => setFormData({...formData, stayType: e.target.value as 'noche' | 'horas'})} className="w-full p-2 border rounded-md">
                        <option value="noche">Noche completa</option>
                        <option value="horas">4 Horas</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Entrada</label>
                    <select name="vehicleType" value={formData.vehicleType} onChange={e => setFormData({...formData, vehicleType: e.target.value as 'pie' | 'auto'})} className="w-full p-2 border rounded-md">
                        <option value="pie">A pie</option>
                        <option value="auto">En auto</option>
                        <option value="moto">En moto</option>
                    </select>
                </div>
                {['auto', 'moto'].includes(formData.vehicleType) && (
                    <>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Color de Auto</label>
                            <input type="text" name="carColor" value={formData.carColor} onChange={e => setFormData({...formData, [e.target.name]: e.target.value})} className="w-full p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">No. de Placas</label>
                            <input type="text" name="licensePlate" value={formData.licensePlate} onChange={e => setFormData({...formData, [e.target.name]: e.target.value})} className="w-full p-2 border rounded-md" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-medium mb-1">Modelo de Auto</label>
                            <input type="text" name="carModel" value={formData.carModel} onChange={e => setFormData({...formData, [e.target.name]: e.target.value})} className="w-full p-2 border rounded-md" />
                        </div>
                    </>
                )}
                <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-1">Comentarios (ej. toallas, control, etc.)</label>
                    <textarea name="comments" value={formData.comments} onChange={e => setFormData({...formData, [e.target.name]: e.target.value})} rows={3} className="w-full p-2 border rounded-md"></textarea>
                </div>
                <div className="md:col-span-2">
                    <button type="submit" className="w-full bg-amber-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors">Registrar Habitación</button>
                </div>
            </form>
        </div>
    );
}