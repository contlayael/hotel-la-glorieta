// src/components/layout/Footer.tsx
import React from 'react';
import { Facebook, Instagram } from '../common/Icons';

interface HotelInfo {
  name: string;
  facebook: string;
  instagram: string;
}

interface FooterProps {
  info: HotelInfo;
}

export default function Footer({ info }: FooterProps) {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href={info.facebook} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors">
            <Facebook className="w-6 h-6" />
          </a>
          <a href={info.instagram} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
        </div>
        <p>© {new Date().getFullYear()} {info.name}. Todos los derechos reservados.</p>
        <p className="text-sm mt-2">Diseño web por YaelContla.</p>
      </div>
    </footer>
  );
}