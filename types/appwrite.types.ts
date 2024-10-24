import { Models } from "node-appwrite"; // Importation des types de modèles depuis la bibliothèque node-appwrite.

/**
 * Interface représentant un patient dans le système.
 * Hérite de `Models.Document` pour inclure des propriétés de base des documents Appwrite, comme `id`, `createdAt`, et `updatedAt`.
 */
export interface Patient extends Models.Document {
  userId: string; // ID de l'utilisateur associé au patient.
  name: string; // Nom du patient.
  email: string; // Adresse e-mail du patient.
  phone: string; // Numéro de téléphone du patient.
  birthDate: Date; // Date de naissance du patient.
  gender: Gender; // Genre du patient (type énuméré non défini ici, mais attendu comme "Homme", "Femme", "Autre").
  address: string; // Adresse du patient.
  occupation: string; // Profession ou métier du patient.
  emergencyContactName: string; // Nom du contact d'urgence du patient.
  emergencyContactNumber: string; // Numéro de téléphone du contact d'urgence.
  primaryPhysician: string; // Médecin principal du patient.
  insuranceProvider: string; // Fournisseur d'assurance ou mutuelle.
  insurancePolicyNumber: string; // Numéro de la police d'assurance.
  allergies: string | undefined; // Allergies du patient (optionnel).
  currentMedication: string | undefined; // Médicaments actuels du patient (optionnel).
  familyMedicalHistory: string | undefined; // Historique médical familial (optionnel).
  pastMedicalHistory: string | undefined; // Historique médical passé du patient (optionnel).
  identificationType: string | undefined; // Type de pièce d'identité (optionnel).
  identificationNumber: string | undefined; // Numéro de la pièce d'identité (optionnel).
  identificationDocument: FormData | undefined; // Document d'identification (optionnel, sous forme de FormData).
  privacyConsent: boolean; // Consentement à la confidentialité du patient.
}

/**
 * Interface représentant un rendez-vous dans le système.
 * Hérite également de `Models.Document` pour inclure les propriétés de base des documents.
 */
export interface Appointment extends Models.Document {
  patient: Patient; // Objet Patient associé au rendez-vous.
  schedule: Date; // Date et heure prévues du rendez-vous.
  status: Status; // Statut du rendez-vous (type énuméré non défini ici, mais attendu comme "programmé", "annulé", "en attente", etc.).
  primaryPhysician: string; // Médecin principal pour le rendez-vous.
  reason: string; // Raison de la visite ou de la consultation.
  note: string; // Note supplémentaire concernant le rendez-vous.
  userId: string; // ID de l'utilisateur associé (le patient).
  cancellationReason: string | null; // Raison de l'annulation, si le rendez-vous est annulé.
}
