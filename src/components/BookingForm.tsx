import React, { useState } from 'react';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  equipmentType: string;
  message?: string;
}

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    equipmentType: 'Vélo Elliptique',
    message: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

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
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la réservation');
      }

      const { payment_url } = await response.json();
      window.location.href = payment_url;
    } catch (error) {
      console.error('Error:', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const equipmentTypes = [
    'Vélo Elliptique',
    'Tapis de Course',
    'Vélo d\'Appartement',
    'Appareil de Musculation'
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00'
  ];

  return (
    <section className="py-16 bg-gray-50" id="booking">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-8">Réserver une intervention</h2>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Nom complet
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Type d'équipement
            </label>
            <select
              name="equipmentType"
              value={formData.equipmentType}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              required
            >
              {equipmentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Date souhaitée
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Créneau horaire
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Sélectionnez un créneau</option>
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Message (optionnel)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              rows={4}
              placeholder="Décrivez le problème rencontré..."
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? 'Traitement en cours...' : 'Réserver maintenant'}
          </button>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Paiement sécurisé par PayPlug
          </p>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
