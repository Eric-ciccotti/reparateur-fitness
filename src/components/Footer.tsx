import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Réparateur Fitness</h3>
            <p className="text-gray-400">
              Service professionnel de réparation d'équipements de fitness pour particuliers et professionnels.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">
              Assistance téléphonique :
            </p>
            <a 
              href="tel:0899256009" 
              className="text-white hover:text-accent transition-colors font-bold"
            >
              0 899 25 60 09
            </a>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Mentions Légales</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/cgv" className="hover:text-white transition-colors">
                  Conditions Générales de Vente
                </a>
              </li>
              <li>
                <a href="/confidentialite" className="hover:text-white transition-colors">
                  Politique de Confidentialité
                </a>
              </li>
              <li>
                <a href="/mentions-legales" className="hover:text-white transition-colors">
                  Mentions Légales
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Réparateur Fitness. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
