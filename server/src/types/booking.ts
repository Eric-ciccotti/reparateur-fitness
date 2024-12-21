import { z } from 'zod';

export const EquipmentTypeSchema = z.enum([
  'Vélo Elliptique', 
  'Tapis de Course', 
  'Vélo d\'Appartement'
]);

export const BookingSchema = z.object({
  name: z.string().min(2, 'Nom trop court'),
  email: z.string().email('Email invalide'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Numéro de téléphone invalide'),
  date: z.date(),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Format d\'heure invalide'),
  equipmentType: EquipmentTypeSchema,
  message: z.string().optional(),
  status: z.enum(['PENDING', 'CONFIRMED', 'PAYMENT_FAILED']).default('PENDING')
});

export type BookingType = z.infer<typeof BookingSchema>;
export type EquipmentType = z.infer<typeof EquipmentTypeSchema>;

export const EQUIPMENT_PRICES: Record<EquipmentType, number> = {
  'Vélo Elliptique': 8900,
  'Tapis de Course': 8900,
  'Vélo d\'Appartement': 7900
};
