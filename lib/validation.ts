import { z } from "zod";

export const UserFormValidation = z.object({
    name: z.string()
    .min(2, "Le nom doit contenir 2 caractères au minimum.",)
    .max(50, "Le nom doit contenir 50 caractères au maximum",),
    email: z.string().email("Adresse mail incorrect."),
    phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), 'Numéro de téléphone incorrect.')
  })