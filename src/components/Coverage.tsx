import React from 'react';

const Coverage = () => {
  const areas = [
    {
      region: "Paris",
      districts: ["Paris 1er - 20e"],
      response: "Intervention sous 24h",
      fee: "Gratuit"
    },
    {
      region: "Petite Couronne",
      districts: ["Hauts-de-Seine (92)", "Seine-Saint-Denis (93)", "Val-de-Marne (94)"],
      response: "Intervention sous 24-48h",
      fee: "29€"
    },
    {
      region: "Grande Couronne",
      districts: ["Yvelines (78)", "Essonne (91)", "Val-d'Oise (95)", "Seine-et-Marne (77)"],
      response: "Intervention sous 48-72h",
      fee: "49€"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Zone d'Intervention
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Service de réparation disponible dans toute l'Île-de-France
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Carte */}
          <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d167998.10803373056!2d2.206977!3d48.8546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sfr!2sfr!4v1672764523540!5m2!1sfr!2sfr"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Zones couvertes */}
          <div className="space-y-6">
            {areas.map((area, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">{index + 1}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2">{area.region}</h3>
                    <ul className="space-y-2 text-gray-600">
                      {area.districts.map((district, idx) => (
                        <li key={idx} className="flex items-center">
                          <svg className="w-5 h-5 text-secondary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                          </svg>
                          {district}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-primary-600">{area.response}</span>
                      <span className="font-semibold">Déplacement : {area.fee}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
