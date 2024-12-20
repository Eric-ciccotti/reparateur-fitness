import dotenv from 'dotenv';
import path from 'path';

// Charger les variables d'environnement depuis le fichier .env parent
dotenv.config({ path: path.join(__dirname, '..', '.env') });

export const config = {
  port: process.env.PORT || 3001,
  frontend_url: process.env.FRONTEND_URL || 'http://localhost:3000',
  backend_url: process.env.BACKEND_URL || 'http://localhost:3001',
  database_url: process.env.DATABASE_URL || 'file:../prisma/dev.db',
  payplug: {
    secret_key: process.env.PAYPLUG_SECRET_KEY || '',
    is_test: process.env.NODE_ENV !== 'production'
  }
};
