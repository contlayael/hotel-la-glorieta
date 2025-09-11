// src/components/sections/Services.tsx
import React from 'react';

interface Service {
  icon: React.ReactNode;
  text: string;
  description: string;
}

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  return (
    <section id="servicios" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Lo que nos hace diferentes</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">Ventajas y Servicios</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-stone-600">
            En Hotel "La Glorieta" estamos comprometidos en ofrecerle un servicio de calidad. Tenemos para ti la #LaGlorietaExperience para que disfrutes cada momento de tu estancia con nosotros.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 bg-amber-100 rounded-lg p-3">
                {service.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-800">{service.text}</h3>
                <p className="mt-1 text-stone-500">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}