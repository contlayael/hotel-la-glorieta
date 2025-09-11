// src/components/sections/Hero.tsx
import { Link } from 'react-router-dom';

interface HeroProps {
  whatsappLink: string;
}

export default function Hero({ whatsappLink }: HeroProps) {
  return (
    <section id="inicio" className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <img
        src="/hero.jpg"
        alt="Vista panorámica del Hotel La Glorieta"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 text-center p-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
          Tu descanso, nuestra prioridad.
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
          Vive una experiencia única en el corazón de Otumba. Comodidad, historia y un servicio excepcional te esperan.
        </p>
        <Link to="/reservar" className="mt-8 inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          Reservar en Línea
        </Link>
      </div>
    </section>
  );
}