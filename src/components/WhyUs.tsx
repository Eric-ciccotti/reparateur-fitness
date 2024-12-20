import React from 'react';

const WhyUs = () => {
  const reasons = [
    {
      icon: "⚡",
      title: "Rapidité d'Intervention",
      description: "Intervention sous 24-48h sur toute l'Île-de-France. Service d'urgence disponible 7j/7."
    },
    {
      icon: "🛠️",
      title: "Expertise Technique",
      description: "Plus de 10 ans d'expérience dans la réparation d'équipements fitness de toutes marques."
    },
    {
      icon: "💯",
      title: "Garantie Satisfaction",
      description: "Garantie pièces et main d'œuvre de 12 mois sur toutes nos interventions."
    },
    {
      icon: "💪",
      title: "Service Premium",
      description: "Diagnostic précis, devis gratuit et transparent, utilisation de pièces d'origine."
    },
    {
      icon: "🏆",
      title: "Certifications",
      description: "Techniciens certifiés par les plus grandes marques d'équipements fitness."
    },
    {
      icon: "🤝",
      title: "Service Client",
      description: "Accompagnement personnalisé et conseils d'entretien pour prolonger la durée de vie de vos appareils."
    }
  ];

  const faqs = [
    {
      question: "Quel est le délai d'intervention ?",
      answer: "Nous intervenons sous 24 à 48h sur toute l'Île-de-France. Un service d'urgence est disponible 7j/7 pour les professionnels."
    },
    {
      question: "Quelles marques réparez-vous ?",
      answer: "Nous réparons toutes les grandes marques : Life Fitness, Technogym, Matrix, Precor, Cybex, Hammer Strength, NordicTrack, ProForm, Domyos, etc."
    },
    {
      question: "Comment se passe une intervention ?",
      answer: "Après votre appel, nous fixons un rendez-vous. Notre technicien effectue un diagnostic complet, établit un devis gratuit, et si vous l'acceptez, procède à la réparation, souvent le jour même."
    },
    {
      question: "Quelle est la durée de la garantie ?",
      answer: "Toutes nos réparations sont garanties 12 mois, pièces et main d'œuvre. Cette garantie couvre tout dysfonctionnement lié à notre intervention."
    },
    {
      question: "Proposez-vous des contrats d'entretien ?",
      answer: "Oui, nous proposons des contrats de maintenance préventive pour les professionnels, avec des visites régulières et un service prioritaire."
    },
    {
      question: "Quels sont les moyens de paiement acceptés ?",
      answer: "Nous acceptons les paiements par carte bancaire, espèces, et virement bancaire. Pour les professionnels, le paiement à 30 jours est possible."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Pourquoi nous choisir */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Pourquoi Nous Choisir
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une expertise reconnue au service de vos équipements fitness
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-3xl mb-4">{reason.icon}</div>
                <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div id="faq">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Questions Fréquentes
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur nos services de réparation
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 shadow-md"
                >
                  <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
