import dotenv from 'dotenv';
import { z } from 'zod';

// Charger les variables d'environnement
dotenv.config();

// Schéma de validation de configuration
const ConfigSchema = z.object({
  PORT: z.string().transform(Number).default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  SUPABASE_URL: z.string().url('URL Supabase invalide'),
  SUPABASE_ANON_KEY: z.string().min(10, 'Clé Supabase invalide'),
  PAYPLUG_API_KEY: z.string().optional(),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

// Valider et transformer la configuration
const validateConfig = (): z.infer<typeof ConfigSchema> => {
  try {
    return ConfigSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Erreur de configuration :', error.errors);
      process.exit(1);
    }
    throw error;
  }
};

export const config = validateConfig();
