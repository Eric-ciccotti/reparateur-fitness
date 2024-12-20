import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {/* Logo représentant un outil et un haltère */}
              <svg className="h-12 w-12 text-primary-600" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Haltère */}
                <path d="M8 20h4v8H8z" fill="currentColor"/>
                <path d="M36 20h4v8h-4z" fill="currentColor"/>
                <path d="M14 16h20v16H14z" fill="currentColor"/>
                <path d="M4 22h6v4H4z" fill="currentColor"/>
                <path d="M38 22h6v4h-6z" fill="currentColor"/>
                {/* Clé à molette superposée */}
                <path d="M28 12c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm3.85 3.15l-2.12-2.12c-.2-.2-.46-.3-.73-.3h-2c-.27 0-.53.1-.73.3l-2.12 2.12c-.2.2-.3.46-.3.73V18h8v-2.12c0-.27-.1-.53-.3-.73z" fill="currentColor"/>
              </svg>
              <div className="ml-2">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                  Réparateur Fitness
                </h1>
                <p className="text-xs text-gray-600">Expert en réparation d'équipements sportifs</p>
              </div>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-600 hover:text-primary-600 transition-colors">
              Services
            </a>
            <a href="#garanties" className="text-gray-600 hover:text-primary-600 transition-colors">
              Nos Garanties
            </a>
            <a href="#contact" className="text-gray-600 hover:text-primary-600 transition-colors">
              Contact
            </a>
            <div className="flex items-center space-x-4">
              <a 
                href="tel:0899256009" 
                className="flex items-center space-x-2 text-accent-500 font-semibold hover:text-accent-600 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>0 899 25 60 09</span>
              </a>
              <button className="bg-gradient-to-r from-secondary-400 to-secondary-500 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:from-secondary-500 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105">
                Réserver
              </button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <a href="#services" className="text-gray-600 hover:text-primary-600 transition-colors">
                Services
              </a>
              <a href="#garanties" className="text-gray-600 hover:text-primary-600 transition-colors">
                Nos Garanties
              </a>
              <a href="#contact" className="text-gray-600 hover:text-primary-600 transition-colors">
                Contact
              </a>
              <a 
                href="tel:0899256009" 
                className="flex items-center space-x-2 text-accent-500 font-semibold hover:text-accent-600 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>0 899 25 60 09</span>
              </a>
              <button className="bg-gradient-to-r from-secondary-400 to-secondary-500 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:from-secondary-500 hover:to-secondary-600 transition-all duration-300">
                Réserver
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
