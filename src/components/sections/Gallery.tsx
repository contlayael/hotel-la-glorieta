// src/components/sections/Gallery.tsx
import React, { useState } from 'react';

interface Image {
  src: string;
  alt: string;
}

interface GalleryProps {
  images: Image[];
}

// Componente para el Modal de la imagen
const ImageModal = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void; }) => (
    <div 
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
        onClick={onClose}
    >
        <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img src={src} alt={alt} className="w-full h-full object-contain rounded-lg" />
            <button 
                onClick={onClose} 
                className="absolute -top-4 -right-4 bg-white text-black rounded-full h-10 w-10 flex items-center justify-center text-2xl font-bold"
            >
                &times;
            </button>
        </div>
    </div>
);


export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  // Define los tamaños para cada imagen en la cuadrícula
  const gridClasses = [
    'col-span-2 row-span-2', // Imagen 1 (Grande)
    'col-span-1 row-span-1', // Imagen 2 (Pequeña)
    'col-span-1 row-span-1', // Imagen 3 (Pequeña)
    'col-span-2 row-span-1', // Imagen 4 (Alargada)
  ];

  return (
    <>
      <section id="galeria" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">Nuestras Instalaciones</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-stone-600">
              Espacios diseñados para tu comodidad y descanso. Echa un vistazo a lo que te espera.
            </p>
          </div>
          {/* Usamos 'grid-flow-dense' para que el grid intente llenar los huecos */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 grid-flow-dense">
            {images.map((image, index) => (
              <div 
                key={index} 
                className={`group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${gridClasses[index % gridClasses.length]}`}
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Renderiza el modal si hay una imagen seleccionada */}
      {selectedImage && (
          <ImageModal 
              src={selectedImage.src}
              alt={selectedImage.alt}
              onClose={() => setSelectedImage(null)}
          />
      )}
    </>
  );
}