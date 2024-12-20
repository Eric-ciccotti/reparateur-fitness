import React from 'react';
import BookingButton from './BookingButton';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-32">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Expert en Réparation d'Équipements Fitness
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Intervention rapide dans toute l'Île-de-France pour réparer vos appareils de fitness
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookingButton 
              text="Réserver une intervention"
              className="text-lg"
            />
            <a 
              href="tel:0899256009"
              className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 text-lg"
            >
              Appeler maintenant
            </a>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="text-xl font-semibold mb-1">Intervention Rapide</h3>
              <p className="text-gray-300">Sous 24-48h</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-2">🛠️</div>
              <h3 className="text-xl font-semibold mb-1">Garantie 1 An</h3>
              <p className="text-gray-300">Pièces et Main d'œuvre</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-2">💪</div>
              <h3 className="text-xl font-semibold mb-1">+1000 Réparations</h3>
              <p className="text-gray-300">Clients satisfaits</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
