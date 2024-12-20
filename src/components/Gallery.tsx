import React, { useState } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const repairs = [
    {
      title: "Tapis de Course Life Fitness",
      before: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80&w=300",
      after: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80&w=300",
      description: "Réparation complète du système d'entraînement et remplacement de la bande de course"
    },
    {
      title: "Vélo Elliptique Technogym",
      before: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80&w=300",
      after: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80&w=300",
      description: "Remplacement du système de résistance magnétique et recalibrage"
    },
    {
      title: "Banc de Musculation",
      before: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80&w=300",
      after: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80&w=300",
      description: "Rénovation complète : sellerie, câbles et poulies"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Nos Réalisations
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez des exemples concrets de nos réparations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repairs.map((repair, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9">
                  <div className="grid grid-cols-2 gap-2 p-4">
                    <div className="relative group cursor-pointer" onClick={() => setSelectedImage(index * 2)}>
                      <img 
                        src={repair.before} 
                        alt={`${repair.title} avant`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                        <span className="font-semibold">Avant</span>
                      </div>
                    </div>
                    <div className="relative group cursor-pointer" onClick={() => setSelectedImage(index * 2 + 1)}>
                      <img 
                        src={repair.after} 
                        alt={`${repair.title} après`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                        <span className="font-semibold">Après</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{repair.title}</h3>
                <p className="text-gray-600">{repair.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal pour l'image en grand */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full">
              <button 
                className="absolute top-4 right-4 text-white hover:text-gray-300"
                onClick={() => setSelectedImage(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img 
                src={repairs[Math.floor(selectedImage / 2)][selectedImage % 2 === 0 ? 'before' : 'after']}
                alt="Vue agrandie"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
