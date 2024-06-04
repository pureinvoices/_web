import { z } from 'zod';

export const emailSchema = z
  .string()
  .email({ message: 'Invalid email address' });

export const passwordSchema = z
  .string()
  .min(8, { message: 'At least 8 characters' })
  .regex(/[A-Z]/, { message: 'At least one uppercase letter' })
  .regex(/[a-z]/, { message: 'At least one lowercase letter' })
  .regex(/[0-9]/, { message: 'At least one number' })
  .regex(/[#?!@$%^&*-]/, { message: 'At least one special character' });
