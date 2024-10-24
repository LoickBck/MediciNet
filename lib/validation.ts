import { z } from "zod"; // Importation de la bibliothèque Zod pour la validation des schémas de données.

/**
 * Schéma de validation pour le formulaire d'utilisateur.
 * - Vérifie que le nom est entre 2 et 50 caractères.
 * - Vérifie que l'email est valide.
 * - Vérifie que le numéro de téléphone suit un format international.
 */
export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Le nom doit comporter au moins 2 caractères")
    .max(50, "Le nom doit comporter au maximum 50 caractères"),
  email: z.string().email("Adresse e-mail invalide"),
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Numéro de téléphone invalide"
    ),
});

/**
 * Schéma de validation pour le formulaire de patient.
 * - Inclut des champs supplémentaires comme l'adresse, le métier, et les contacts d'urgence.
 * - Valide les consentements nécessaires, tels que le consentement au traitement et à la confidentialité.
 */
export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "Le nom doit comporter au moins 2 caractères")
    .max(50, "Le nom doit comporter au maximum 50 caractères"),
  email: z.string().email("Adresse e-mail invalide"),
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Numéro de téléphone invalide"
    ),
  birthDate: z.coerce.date(), // Convertit la chaîne de date en un objet Date.
  gender: z.enum(["Homme", "Femme", "Autre"]), // Genre avec choix limités.
  address: z
    .string()
    .min(5, "L'adresse doit comporter au moins 5 caractères")
    .max(500, "L'adresse doit comporter au maximum 500 caractères"),
  occupation: z
    .string()
    .min(2, "Le métier doit comporter au moins 2 caractères")
    .max(500, "Le métier doit comporter au maximum 500 caractères"),
  emergencyContactName: z
    .string()
    .min(2, "Le nom du contact doit comporter au moins 2 caractères")
    .max(50, "Le nom du contact doit comporter au maximum 50 caractères"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Numéro de téléphone invalide"
    ),
  primaryPhysician: z
    .string()
    .min(2, "Veuillez sélectionner au moins un médecin"),
  insuranceProvider: z
    .string()
    .min(
      2,
      "Le nom de l'assurance/mutuelle doit comporter au moins 2 caractères"
    )
    .max(
      50,
      "Le nom de l'assurance doit/mutuelle comporter au maximum 50 caractères"
    ),
  insurancePolicyNumber: z
    .string()
    .min(
      2,
      "Le numéro de la police d'assurance/mutuelle doit comporter au moins 2 caractères"
    )
    .max(
      50,
      "Le numéro de la police d'assurance doit/mutuelle comporter au maximum 50 caractères"
    ),
  allergies: z.string().optional(), // Champs optionnels
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Vous devez consentir au traitement pour continuer",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Vous devez consentir à la divulgation pour continuer",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Vous devez consentir à la confidentialité pour continuer",
    }),
});

/**
 * Schéma de validation pour créer un rendez-vous.
 * - Vérifie que le médecin est sélectionné et que la date/heure est correcte.
 * - Inclut des champs pour les raisons de rendez-vous et des notes optionnelles.
 */
export const CreateAppointmentSchema = z.object({
  primaryPhysician: z
    .string()
    .min(2, "Veuillez sélectionner au moins un médecin"),
  schedule: z.coerce.date(), // Convertit la chaîne de date en objet Date.
  reason: z
    .string()
    .min(2, "La raison doit comporter au moins 2 caractères")
    .max(500, "La raison doit comporter au maximum 500 caractères"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

/**
 * Schéma de validation pour programmer un rendez-vous.
 * - Moins strict, permettant d'ajouter des raisons et des notes facultatives.
 */
export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z
    .string()
    .min(2, "Veuillez sélectionner au moins un médecin"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

/**
 * Schéma de validation pour annuler un rendez-vous.
 * - Nécessite une raison d'annulation d'au moins 2 caractères.
 */
export const CancelAppointmentSchema = z.object({
  primaryPhysician: z
    .string()
    .min(2, "Veuillez sélectionner au moins un médecin"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "La raison doit comporter au moins 2 caractères")
    .max(500, "La raison doit comporter au maximum 500 caractères"),
});

/**
 * Fonction utilitaire pour obtenir le schéma de validation de rendez-vous approprié.
 * @param type - Le type de rendez-vous (create, cancel, default).
 * @returns Le schéma de validation correspondant.
 */
export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
