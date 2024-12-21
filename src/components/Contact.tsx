import React, { useState } from 'react';
import axios from 'axios';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  equipmentType: string;
  message: string;
}

interface BookingResponse {
  success: boolean;
  payment_url?: string;
  error?: string;
}

// Utiliser une URL relative pour l'API
const API_URL = '/api';

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    equipmentType: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('API URL:', API_URL);
      console.log('Sending booking request:', formData);
      
      const response = await axios.post<BookingResponse>(`${API_URL}/api/bookings`, formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: false
      });
      
      console.log('Booking response:', response.data);
      
      if (response.data.success && response.data.payment_url) {
        window.location.href = response.data.payment_url;
      } else {
        throw new Error(response.data.error || 'La création de la réservation a échoué');
      }
    } catch (err: any) {
      console.error('Booking error:', err);
      let errorMessage = 'Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.';
      
      if (err.response) {
        console.error('Error response:', {
          data: err.response.data,
          status: err.response.status,
          headers: err.response.headers
        });
        errorMessage = err.response.data?.error || errorMessage;
      } else if (err.request) {
        console.error('Error request:', err.request);
        errorMessage = 'Impossible de contacter le serveur. Veuillez vérifier votre connexion.';
      } else {
        console.error('Error message:', err.message);
        errorMessage = err.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = [
    '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Réserver une Intervention
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Remplissez le formulaire ci-dessous pour réserver votre créneau
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="06 XX XX XX XX"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Type d'équipement
                </label>
                <select
                  name="equipmentType"
                  required
                  value={formData.equipmentType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="tapis">Tapis de Course</option>
                  <option value="velo">Vélo d'Appartement</option>
                  <option value="elliptique">Vélo Elliptique</option>
                  <option value="musculation">Machine de Musculation</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Date souhaitée
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Créneau horaire
                </label>
                <select
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                >
                  <option value="">Sélectionnez un créneau</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-gray-700 font-medium mb-2">
                Message (optionnel)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                placeholder="Décrivez votre problème ou ajoutez des informations supplémentaires..."
              />
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`
                  px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 
                  text-white font-semibold rounded-lg shadow-lg 
                  hover:from-primary-700 hover:to-primary-800 
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                  transition-all duration-300
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {loading ? 'Traitement en cours...' : 'Réserver maintenant'}
              </button>
            </div>
          </form>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Besoin d'une intervention urgente ?
            </p>
            <a
              href="tel:0899256009"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0 899 25 60 09
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
