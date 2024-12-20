import React from 'react';

const Pricing = () => {
  const services = [
    {
      title: "Diagnostic",
      price: "49€",
      description: "Diagnostic complet de votre appareil",
      features: [
        "Déplacement inclus",
        "Inspection complète",
        "Test de fonctionnement",
        "Devis détaillé gratuit"
      ]
    },
    {
      title: "Réparation Standard",
      price: "À partir de 89€",
      description: "Réparations courantes et maintenance",
      features: [
        "Main d'œuvre incluse",
        "Pièces d'origine",
        "Garantie 12 mois",
        "Nettoyage inclus"
      ],
      popular: true
    },
    {
      title: "Maintenance Pro",
      price: "Sur devis",
      description: "Pour les professionnels",
      features: [
        "Contrat personnalisé",
        "Maintenance préventive",
        "Intervention prioritaire",
        "Support dédié"
      ]
    }
  ];

  return (
    <section id="tarifs" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Tarifs Transparents
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des prix clairs et sans surprise pour tous vos besoins de réparation
          </p>
        </div>

        {/* Grille tarifaire */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl p-8 shadow-lg border ${
                service.popular ? 'border-secondary-500' : 'border-gray-100'
              }`}
            >
              {service.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-secondary-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
                    Plus populaire
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {service.price}
                </div>
                <p className="text-gray-600">{service.description}</p>
              </div>

              <ul className="space-y-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg className="w-5 h-5 text-secondary-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full mt-8 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                service.popular
                  ? 'bg-gradient-to-r from-secondary-400 to-secondary-500 text-white hover:from-secondary-500 hover:to-secondary-600'
                  : 'bg-white text-primary-600 border-2 border-primary-100 hover:border-primary-200'
              }`}>
                Réserver
              </button>
            </div>
          ))}
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h4 className="text-lg font-semibold mb-4">Frais de Déplacement</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Paris : Gratuit</li>
              <li>• Petite Couronne : 29€</li>
              <li>• Grande Couronne : 49€</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h4 className="text-lg font-semibold mb-4">Moyens de Paiement</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Carte Bancaire</li>
              <li>• Espèces</li>
              <li>• Virement</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h4 className="text-lg font-semibold mb-4">Garantie & SAV</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Garantie pièces & main d'œuvre</li>
              <li>• Validité 12 mois</li>
              <li>• SAV réactif</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
