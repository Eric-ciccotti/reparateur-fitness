import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bookingRoutes from './routes/booking.routes.js';
import { config } from './config/server.js';
import Logger from './utils/logger.js';
import { setupSwagger } from './config/swagger.js';

const app = express();

// Middlewares de sécurité
app.use(helmet());
app.use(cors());

// Parsing des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite 100 requêtes par IP
  message: 'Trop de requêtes, veuillez réessayer plus tard'
});
app.use(limiter);

// Documentation API
setupSwagger(app);

// Routes
app.use('/api', bookingRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

// Gestion des erreurs globales
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  Logger.error(`Erreur non gérée : ${err.message}`);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur'
  });
});

// Démarrage du serveur
const startServer = () => {
  const PORT = config.PORT;
  app.listen(PORT, () => {
    Logger.info(`🚀 Serveur démarré sur le port ${PORT}`);
    Logger.info(`Mode: ${config.NODE_ENV}`);
    Logger.info(`Documentation API disponible sur http://localhost:${PORT}/api-docs`);
  });
};

startServer();
