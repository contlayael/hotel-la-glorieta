// src/components/sections/Contact.tsx
import React from 'react';

// Definimos los tipos para las props
interface HotelInfo {
  phone: string;
  whatsappLink: string;
  email: string;
  address: string;
  addresLink: string;
}

interface ContactProps {
  info: HotelInfo;
}

export default function Contact({ info }: ContactProps) {
  return (
    <section id="contacto" className="py-16 sm:py-24 bg-stone-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Contáctanos</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-stone-300">
          ¿Listo para tu próxima estancia? Llámanos o envíanos un correo. ¡Será un placer atenderte!
        </p>
        <div className="mt-10 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
          <div className="text-center">
            <h3 className="text-xl font-semibold">WhatsApp</h3>
            <a href={info.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 text-lg transition-colors">{info.phone}</a>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">Email</h3>
            <a href={`mailto:${info.email}`} className="text-amber-400 hover:text-amber-300 text-lg transition-colors">{info.email}</a>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">Dirección</h3>
            <a href={info.addresLink} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 text-lg transition-colors">{info.address}</a>
          </div>
        </div>
        <div className="mt-12 bg-stone-700 h-64 w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
          {/* Aquí puedes insertar el iframe de Google Maps */}
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3756.183331113388!2d-98.75912712505576!3d19.704817431931712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1c0cf29b3f09d%3A0xd4899d47372c06c9!2sHotel%20La%20Glorieta!5e0!3m2!1ses-419!2smx!4v1757363770463!5m2!1ses-419!2smx" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">

            </iframe>
        </div>
      </div>
    </section>
  );
}