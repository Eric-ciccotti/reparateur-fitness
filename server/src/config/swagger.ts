import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import type { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Réparateur Fitness API',
      version: '1.0.0',
      description: 'API pour la réservation d\'équipements de fitness',
      contact: {
        name: 'Support Technique',
        email: 'support@reparateur-fitness.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Serveur de développement'
      }
    ],
    components: {
      schemas: {
        Booking: {
          type: 'object',
          required: ['name', 'email', 'phone', 'date', 'time', 'equipmentType'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            date: { type: 'string', format: 'date' },
            time: { type: 'string', pattern: '^\\d{2}:\\d{2}$' },
            equipmentType: {
              type: 'string',
              enum: ['Vélo Elliptique', 'Tapis de Course', 'Vélo d\'Appartement']
            },
            message: { type: 'string' },
            status: {
              type: 'string',
              enum: ['PENDING', 'CONFIRMED', 'PAYMENT_FAILED']
            }
          }
        }
      }
    }
  },
  apis: ['./server/src/routes/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
