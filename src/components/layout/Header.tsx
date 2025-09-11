// src/components/layout/Header.tsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from '../common/Icons';

// Definimos los tipos para las props que recibe el componente
interface NavLinkItem {
  name: string;
  href: string;
}

interface HeaderProps {
  navLinks: NavLinkItem[];
}

export default function Header({ navLinks }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith('/#')) {
      // Para enlaces de anclaje en la misma página
      setTimeout(() => {
        const id = href.substring(2);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold text-amber-700">
            Hotel La Glorieta
          </Link>
          {/* Navegación para Escritorio */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={({ isActive }) =>
                  `text-stone-600 hover:text-amber-600 transition-colors duration-300 font-medium ${
                    isActive && link.href === '/reservar' ? 'text-amber-600' : ''
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          {/* Botón para Menú Móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-stone-600 hover:text-amber-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Menú Móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4">
          <nav className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-stone-600 hover:text-amber-600 transition-colors duration-300 font-medium"
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}