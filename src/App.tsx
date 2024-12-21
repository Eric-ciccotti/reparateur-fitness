import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Coverage from './components/Coverage';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Pages de confirmation
const BookingSuccess = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
      <div className="text-green-500 text-6xl mb-4">✓</div>
      <h1 className="text-2xl font-bold mb-4">Réservation Confirmée !</h1>
      <p className="text-gray-600 mb-6">
        Votre paiement a été accepté et votre intervention est programmée.
        Vous allez recevoir un email de confirmation avec tous les détails.
      </p>
      <a 
        href="/"
        className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
      >
        Retour à l'accueil
      </a>
    </div>
  </div>
);

const BookingCancel = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
      <div className="text-red-500 text-6xl mb-4">×</div>
      <h1 className="text-2xl font-bold mb-4">Réservation Annulée</h1>
      <p className="text-gray-600 mb-6">
        Le paiement n'a pas abouti. Vous pouvez réessayer ou nous contacter
        directement si vous rencontrez des difficultés.
      </p>
      <div className="space-y-4">
        <a 
          href="/"
          className="block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
        >
          Réessayer
        </a>
        <a 
          href="tel:0899256009"
          className="block px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg border-2 border-primary-600 hover:bg-primary-50 transition-colors"
        >
          Nous appeler
        </a>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/booking/success" element={<BookingSuccess />} />
          <Route path="/booking/cancel" element={<BookingCancel />} />
          <Route path="/" element={
            <>
              <Hero />
              <Services />
              <WhyUs />
              <Gallery />
              <Testimonials />
              <Coverage />
              <Pricing />
              <Contact />
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
