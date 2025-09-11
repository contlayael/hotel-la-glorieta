// src/components/sections/Tubohotel.tsx
import React from 'react';

// Definimos los tipos para las props
interface TubohotelProps {
  whatsappLink: string;
}

export default function Tubohotel({ whatsappLink }: TubohotelProps) {
  return (
    <section id="tubohotel" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Una experiencia única</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">Descubre el Tubohotel</h2>
            <p className="mt-4 text-lg text-stone-600">
              Atrévete a vivir una noche diferente en nuestras innovadoras habitaciones tipo tubo. Perfectas para aventureros que buscan confort y originalidad. Cuentan con una cómoda cama matrimonial, luz interior y contactos para tus dispositivos.
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block bg-stone-800 hover:bg-stone-900 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors">
              Consultar Disponibilidad
            </a>
          </div>
          <div className="order-1 md:order-2">
            <img 
              src="/public/galeria2.jpeg" 
              alt="Interior de una habitación Tubohotel" 
              className="rounded-xl shadow-2xl w-full h-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}