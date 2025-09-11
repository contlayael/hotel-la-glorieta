// src/data/hotelData.tsx
// Importamos los iconos porque los usamos en la lista de servicios
import { BedDouble, CircleDot, Shirt, Tv, Wifi, ShowerHead } from '../components/common/Icons';
import { Room } from '../types';

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

// --- Datos de la Landing Page ---
export const hotelInfo = {
    name: "Hotel La Glorieta",
    phone: "55-3077-1519",
    whatsappLink: "https://wa.me/525530771519?text=Hola,%20me%20gustaría%20pedir%20información%20sobre%20el%20Hotel%20La%20Glorieta.",
    email: "hotel.laglorieta@hotmail.com",
    address: "Leona Vicario Manzana 028, 55900 Otumba de Gómez Farías, Méx.",
    addresLink: "https://maps.app.goo.gl/vnnXumCkJe74y43f7",
    facebook: "https://www.facebook.com/share/1AKoAT4bDA/",
    instagram: "https://www.instagram.com/laglorietahm?utm_source=qr&igsh=ODB1a3hxbjUwOG1k",
};

export const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/#servicios' },
    { name: 'Galería', href: '/#galeria' },
    { name: 'Tubohotel', href: '/#tubohotel' },
    { name: 'Contacto', href: '/#contacto' },
    { name: 'Reservar', href: '/reservar' },
];

export const galleryImages = [
    { src: '/public/galeria1.jpeg', alt: 'Patio con Tubohotels y palmeras' },
    { src: '/public/galeria3.jpeg', alt: 'Fachada del Hotel y Motel La Glorieta' },
    { src: '/public/galeria4.jpeg', alt: 'Recepción del Hotel La Glorieta' },
    { src: '/public/galeria5.jpeg', alt: 'Entrada al hotel con globo aerostático al fondo' },
];

export const servicesData = [
    { icon: <BedDouble className="w-10 h-10 text-amber-600"/>, text: "Diferentes tipos de habitaciones", description: "Habacitaciones para cada tipo de viajero y presupuesto." },
    { icon: <CircleDot className="w-10 h-10 text-amber-600"/>, text: "TuboHotel", description: "Una experiencia original y confortable para aventureros." },
    { icon: <Shirt className="w-10 h-10 text-amber-600"/>, text: "Servicio de lavandería", description: "Mantén tu ropa impecable during tu estancia (costo extra)." },
    { icon: <Tv className="w-10 h-10 text-amber-600"/>, text: "TV con cable", description: "Disfruta de tus programas favoritos en la comodidad de tu cuarto." },
    { icon: <Wifi className="w-10 h-10 text-amber-600"/>, text: "WIFI Gratuito", description: "Conéctate y comparte tus momentos en nuestras instalaciones." },
    { icon: <ShowerHead className="w-10 h-10 text-amber-600"/>, text: "Agua caliente las 24hrs", description: "Una ducha relajante a cualquier hora del día." },
];