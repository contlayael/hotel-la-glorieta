import React, { useState, useEffect } from 'react';

// --- Iconos (Componentes SVG para no tener dependencias externas) ---
const BedDouble = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
    <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
    <path d="M12 10v10" />
    <path d="M2 18h20" />
  </svg>
);

const CircleDot = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);

// NUEVO: Icono para Lavandería
const Shirt = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20.38 3.46 16 2a4 4 0 0 0-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
  </svg>
);

const Tv = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
    <polyline points="17 2 12 7 7 2" />
  </svg>
);

const Wifi = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12.55a8 8 0 0 1 14 0" />
    <path d="M2 8.82a15 15 0 0 1 20 0" />
    <path d="M8 16.29a4 4 0 0 1 8 0" />
    <line x1="12" x2="12.01" y1="20" y2="20" />
  </svg>
);

const ShowerHead = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m4 4 2.5 2.5" />
    <path d="M13.5 6.5a4.5 4.5 0 1 1 6.4 6.4" />
    <path d="M16 16h4v4" />
    <path d="m20 16-5-5" />
    <path d="M16 8v.01" />
    <path d="M19 11v.01" />
    <path d="M11 16v.01" />
    <path d="M14 19v.01" />
  </svg>
);

const Menu = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const X = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// NUEVO: Iconos para redes sociales
const Instagram = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const Facebook = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);


// --- Componente Principal de la Aplicación ---
export default function App() {
  // --- Datos del Hotel (ACTUALIZADOS) ---
  const hotelInfo = {
    name: "Hotel La Glorieta",
    phone: "55-3077-1519",
    whatsappLink: "https://wa.me/525530771519?text=Hola,%20me%20gustaría%20pedir%20información%20sobre%20el%20Hotel%20La%20Glorieta.",
    email: "hotel.laglorieta@hotmail.com",
    address: "Leona Vicario Manzana 028, 55900 Otumba de Gómez Farías, Méx.",
    addresLink: "https://maps.app.goo.gl/vnnXumCkJe74y43f7",
    facebook: "https://www.facebook.com/share/1AKoAT4bDA/",
    instagram: "https://www.instagram.com/laglorietahm?utm_source=qr&igsh=ODB1a3hxbjUwOG1k",
  };

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Galería', href: '#galeria' },
    { name: 'Tubohotel', href: '#tubohotel' },
    { name: 'Contacto', href: '#contacto' },
  ];

  // --- Servicios (ACTUALIZADOS) ---
  const services = [
    { icon: <BedDouble className="w-10 h-10 text-amber-600"/>, text: "Diferentes tipos de habitaciones", description: "Habitaciones para cada tipo de viajero y presupuesto." },
    { icon: <CircleDot className="w-10 h-10 text-amber-600"/>, text: "TuboHotel", description: "Una experiencia original y confortable para aventureros." },
    { icon: <Shirt className="w-10 h-10 text-amber-600"/>, text: "Servicio de lavandería", description: "Mantén tu ropa impecable durante tu estancia (costo extra)." },
    { icon: <Tv className="w-10 h-10 text-amber-600"/>, text: "TV con cable", description: "Disfruta de tus programas favoritos en la comodidad de tu cuarto." },
    { icon: <Wifi className="w-10 h-10 text-amber-600"/>, text: "WIFI Gratuito", description: "Conéctate y comparte tus momentos en nuestras instalaciones." },
    { icon: <ShowerHead className="w-10 h-10 text-amber-600"/>, text: "Agua caliente las 24hrs", description: "Una ducha relajante a cualquier hora del día." },
  ];

  const galleryImages = [
    { src: '/galeria1.jpeg', alt: 'Patio con Tubohotels y palmeras' },
    { src: '/galeria3.jpeg', alt: 'Fachada del Hotel y Motel La Glorieta' },
    { src: '/galeria4.jpeg', alt: 'Recepción del Hotel La Glorieta' },
    { src: '/galeria5.jpeg', alt: 'Entrada al hotel con globo aerostático al fondo' },
  ];
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-stone-50 text-stone-800 font-sans">
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#inicio" className="text-2xl font-bold text-amber-700">
              Hotel La Glorieta
            </a>
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-stone-600 hover:text-amber-600 transition-colors duration-300 font-medium">
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-600 hover:text-amber-600">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white pb-4">
            <nav className="flex flex-col items-center space-y-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-stone-600 hover:text-amber-600 transition-colors duration-300 font-medium">
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>
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
            <a href={hotelInfo.whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              Reservar Ahora
            </a>
          </div>
        </section>

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

        <section id="galeria" className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">Nuestras Instalaciones</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-stone-600">
                Espacios diseñados para tu comodidad y descanso. Echa un vistazo a lo que te espera.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ${index === 0 ? 'col-span-2 row-span-2' : ''}`}>
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="tubohotel" className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Una experiencia única</p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">Descubre el Tubohotel</h2>
                <p className="mt-4 text-lg text-stone-600">
                  Atrévete a vivir una noche diferente en nuestras innovadoras habitaciones tipo tubo. Perfectas para aventureros que buscan confort y originalidad. Cuentan con una cómoda cama matrimonial, luz interior y contactos para tus dispositivos.
                </p>
                <a href={hotelInfo.whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block bg-stone-800 hover:bg-stone-900 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors">
                  Consultar Disponibilidad
                </a>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src="/galeria2.jpeg" 
                  alt="Interior de una habitación Tubohotel" 
                  className="rounded-xl shadow-2xl w-full h-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="py-16 sm:py-24 bg-stone-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Contáctanos</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-stone-300">
              ¿Listo para tu próxima estancia? Llámanos o envíanos un correo. ¡Será un placer atenderte!
            </p>
            <div className="mt-10 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
              <div className="text-center">
                <h3 className="text-xl font-semibold">WhatsApp</h3>
                <a href={hotelInfo.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 text-lg transition-colors">{hotelInfo.phone}</a>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold">Email</h3>
                <a href={`mailto:${hotelInfo.email}`} className="text-amber-400 hover:text-amber-300 text-lg transition-colors">{hotelInfo.email}</a>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold">Dirección</h3>
                <a href={hotelInfo.addresLink} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 text-lg transition-colors">{hotelInfo.address}</a>
              </div>
            </div>
            <div className="mt-12 bg-stone-700 h-64 w-full max-w-4xl mx-auto rounded-lg flex items-center justify-center">
                <p className="text-stone-400">Aquí se mostrará un mapa de Google Maps</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-stone-900 text-stone-400">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href={hotelInfo.facebook} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href={hotelInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} {hotelInfo.name}. Todos los derechos reservados.</p>
          <p className="text-sm mt-2">Diseño web por YaelContla.</p>
        </div>
      </footer>
    </div>
  );
}
