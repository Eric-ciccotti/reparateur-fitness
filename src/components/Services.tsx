import React from 'react';
import BookingButton from './BookingButton';

const Services = () => {
  const services = [
    {
      icon: '🏃',
      title: 'Tapis de Course',
      type: 'tapis',
      description: 'Réparation de courroies, moteurs, cartes électroniques. Toutes marques.',
      price: 'À partir de 89€'
    },
    {
      icon: '🚲',
      title: 'Vélos d\'Appartement',
      type: 'velo',
      description: 'Réparation de systèmes de résistance, consoles, pédales. Maintenance complète.',
      price: 'À partir de 79€'
    },
    {
      icon: '⭕',
      title: 'Vélos Elliptiques',
      type: 'elliptique',
      description: 'Réparation des systèmes magnétiques, rails, bras mobiles. Calibrage précis.',
      price: 'À partir de 89€'
    },
    {
      icon: '💪',
      title: 'Machines de Musculation',
      type: 'musculation',
      description: 'Réparation de câbles, poulies, sellerie. Remplacement de pièces.',
      price: 'À partir de 69€'
    }
  ];

  const process = [
    {
      number: '1',
      title: 'Diagnostic',
      description: 'Analyse complète de votre équipement'
    },
    {
      number: '2',
      title: 'Devis Gratuit',
      description: 'Prix transparent, sans surprise'
    },
    {
      number: '3',
      title: 'Réparation',
      description: 'Intervention rapide et professionnelle'
    },
    {
      number: '4',
      title: 'Garantie',
      description: '12 mois pièces et main d\'œuvre'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Nos Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expertise technique pour tous vos équipements de fitness
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-lg font-semibold text-primary-600 mb-4">{service.price}</p>
              <BookingButton 
                equipmentType={service.type}
                text="Réserver"
                className="w-full"
              />
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-8">Notre Processus d'Intervention</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Marques Supportées</h3>
          <div className="flex flex-wrap justify-center gap-8 text-gray-600">
            {[
              'Life Fitness', 'Technogym', 'Matrix',
              'Precor', 'Cybex', 'Hammer Strength',
              'NordicTrack', 'ProForm', 'Domyos'
            ].map((brand, index) => (
              <span key={index} className="text-lg">{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
