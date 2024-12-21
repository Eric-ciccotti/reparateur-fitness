# Réparateur Fitness 💪

## Description
Application de réservation d'équipements de fitness avec système de paiement intégré.

## Fonctionnalités
- Réservation d'équipements
- Validation des données
- Intégration Supabase
- Documentation API Swagger
- Tests unitaires et d'intégration

## Prérequis
- Node.js 20+
- npm 9+

## Installation
```bash
# Cloner le repository
git clone https://github.com/votre-username/reparateur-fitness.git

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
```

## Scripts
- `npm run dev`: Démarrer le serveur de développement
- `npm run build`: Compiler le projet
- `npm test`: Exécuter les tests
- `npm run lint`: Vérifier la qualité du code
- `npm run format`: Formater le code

## Documentation API
Accédez à la documentation Swagger :
`http://localhost:5000/api-docs`

## Structure du Projet
```
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   └── tests/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── scripts/
```

## Technologies
- Backend: Express, TypeScript
- Base de données: Supabase
- Tests: Jest
- Documentation: Swagger
- CI/CD: GitHub Actions

## Contribution
1. Fork le projet
2. Créez votre branche de fonctionnalité
3. Commitez vos modifications
4. Poussez sur la branche
5. Ouvrez une Pull Request

## Licence
MIT License
