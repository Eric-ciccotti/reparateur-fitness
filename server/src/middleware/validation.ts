import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import Logger from '../utils/logger.js';

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      Logger.error(`Validation Error: ${error}`);
      res.status(400).json({
        success: false,
        error: 'Données de requête invalides',
        details: error instanceof Error ? error.message : 'Erreur de validation'
      });
    }
  };
};
