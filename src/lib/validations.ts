import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(200),
  sku: z.string().min(3, 'Le SKU est requis'),
  category: z.string().min(2, 'La catégorie est requise'),
  description: z.string().optional(),
  price: z.number().positive('Le prix doit être positif').optional(),
  currency: z.string().length(3).default('EUR'),
  ingredients: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  hs_code: z.string().optional(),
});

export type ProductPayload = z.infer<typeof productSchema>;

// Schéma pour la connexion
export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

export type LoginPayload = z.infer<typeof loginSchema>;
