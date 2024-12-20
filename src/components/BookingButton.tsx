import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BookingButtonProps {
  equipmentType?: string;
  className?: string;
  text?: string;
}

const BookingButton: React.FC<BookingButtonProps> = ({ 
  equipmentType = '', 
  className = '',
  text = 'Réserver maintenant'
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      // Si un type d'équipement est spécifié, on pré-remplit le formulaire
      if (equipmentType) {
        const select = document.querySelector('select[name="equipmentType"]') as HTMLSelectElement;
        if (select) {
          select.value = equipmentType;
          // Déclencher l'événement change pour mettre à jour le state du formulaire
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg shadow-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 ${className}`}
    >
      {text}
    </button>
  );
};

export default BookingButton;
