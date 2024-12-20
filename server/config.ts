import dotenv from 'dotenv';
import path from 'path';

// Charger les variables d'environnement depuis le fichier .env parent
dotenv.config({ path: path.join(__dirname, '..', '.env') });

interface PayPlugConfig {
  secret_key: string;
  is_test: boolean;
}

interface Config {
  port: number;
  frontend_url: string;
  backend_url: string;
  database_url: string;
  payplug: PayPlugConfig;
  node_env: string;
}

// Validation des variables d'environnement requises
const requiredEnvVars = ['FRONTEND_URL', 'BACKEND_URL', 'DATABASE_URL', 'PAYPLUG_SECRET_KEY'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export const config: Config = {
  port: parseInt(process.env.PORT || '3001', 10),
  frontend_url: process.env.FRONTEND_URL!,
  backend_url: process.env.BACKEND_URL!,
  database_url: process.env.DATABASE_URL!,
  node_env: process.env.NODE_ENV || 'development',
  payplug: {
    secret_key: process.env.PAYPLUG_SECRET_KEY!,
    is_test: process.env.NODE_ENV !== 'production'
  }
};
