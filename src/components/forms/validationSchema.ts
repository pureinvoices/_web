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

export const businessDetails = {
  nameSchema: z
    .string()
    .max(25, { message: 'Name must be 25 characters or fewer' }),
  addressSchema: z
    .string()
    .max(80, { message: 'Address must be 80 characters or fewer' }),
  emailSchema: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  websiteSchema: z.string().url({ message: 'Please enter a valid URL' }),
  phoneNumberSchema: z.string().regex(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, {
    message: 'Phone number must be in the format (555) 123-4567',
  }),
};
