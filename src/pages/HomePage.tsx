// src/pages/HomePage.tsx
import React from 'react';

// Importa los componentes de las secciones
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Gallery from '../components/sections/Gallery';
import Tubohotel from '../components/sections/Tubohotel';
import Contact from '../components/sections/Contact';

// Importa los datos que necesitan los componentes
import { hotelInfo, servicesData, galleryImages } from '../data/hotelData.tsx';

export default function HomePage() {
  return (
    <main>
      {/* Pasamos los datos a cada componente como props */}
      <Hero whatsappLink={hotelInfo.whatsappLink} />
      <Services services={servicesData} />
      <Gallery images={galleryImages} />
      <Tubohotel whatsappLink={hotelInfo.whatsappLink} />
      <Contact info={hotelInfo} />
    </main>
  );
}