import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jean Dupont",
      role: "Propriétaire de Salle",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=150&h=150",
      text: "Intervention rapide et professionnelle sur nos tapis de course. Le technicien a été très minutieux et nous a donné de précieux conseils d'entretien.",
      rating: 5
    },
    {
      name: "Marie Martin",
      role: "Coach Sportif",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
      text: "Service excellent ! Réparation de mon vélo elliptique en moins de 24h. Je recommande vivement pour leur expertise et leur réactivité.",
      rating: 5
    },
    {
      name: "Pierre Dubois",
      role: "Particulier",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
      text: "Devis gratuit et transparent. La réparation a été faite sur place et mon appareil de musculation fonctionne comme neuf.",
      rating: 5
    }
  ];

  return (
    <section id="temoignages" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Ils Nous Font Confiance
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les retours d'expérience de nos clients satisfaits
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { number: "1000+", label: "Interventions" },
            { number: "98%", label: "Clients Satisfaits" },
            { number: "24h", label: "Délai Moyen" },
            { number: "12", label: "Mois de Garantie" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Témoignages */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-6 shadow-lg relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-600 mb-6">"{testimonial.text}"</p>

              {/* Author */}
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-secondary-400 to-secondary-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-secondary-500 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105">
            Demander un Devis Gratuit
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
