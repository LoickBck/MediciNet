/* eslint-disable no-unused-vars */
// Directive pour désactiver la règle ESLint qui signale les variables non utilisées. Utile pour les types déclarés qui ne sont pas encore utilisés partout.

/**
 * Type pour les paramètres de recherche (searchParams) et les paramètres d'URL (params).
 * - `params` : Objet contenant des paires clé-valeur de chaînes de caractères, représentant les paramètres d'URL.
 * - `searchParams` : Objet contenant des paires clé-valeur où les valeurs peuvent être des chaînes simples, des tableaux de chaînes, ou `undefined`.
 */
declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

/**
 * Type pour définir le genre d'une personne.
 * - Options : "Homme", "Femme", "Autre".
 */
declare type Gender = "Homme" | "Femme" | "Autre";

/**
 * Type pour définir le statut d'un rendez-vous.
 * - Options : "attente", "programmé", "annulé".
 */
declare type Status = "attente" | "programmé" | "annulé";

/**
 * Interface pour les paramètres nécessaires à la création d'un utilisateur.
 * - Contient le nom, l'email et le numéro de téléphone de l'utilisateur.
 */
declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}

/**
 * Interface représentant un utilisateur complet.
 * - Inclut les paramètres de création d'utilisateur et ajoute un identifiant unique (`$id`).
 */
declare interface User extends CreateUserParams {
  $id: string;
}

/**
 * Interface pour les paramètres nécessaires à l'enregistrement complet d'un patient.
 * - Hérite de `CreateUserParams` et ajoute des champs supplémentaires comme la date de naissance, le genre, l'adresse, les contacts d'urgence, et des informations médicales.
 */
declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  birthDate: Date;
  gender: Gender; // Utilise le type `Gender` défini plus haut.
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined; // Champs optionnels
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

/**
 * Type pour les paramètres nécessaires à la création d'un rendez-vous.
 * - Contient l'ID de l'utilisateur, le patient associé, le médecin, la raison du rendez-vous, la date/heure prévue, le statut, et des notes optionnelles.
 */
declare type CreateAppointmentParams = {
  userId: string;
  patient: string; // Nom ou ID du patient
  primaryPhysician: string; // Nom ou ID du médecin
  reason: string; // Raison de la consultation
  schedule: Date; // Date et heure du rendez-vous
  status: Status; // Utilise le type `Status` défini plus haut.
  note: string | undefined; // Note optionnelle pour le rendez-vous
};

/**
 * Type pour les paramètres nécessaires à la mise à jour d'un rendez-vous.
 * - Contient l'ID du rendez-vous, l'ID de l'utilisateur, les informations complètes du rendez-vous et un type de mise à jour.
 */
declare type UpdateAppointmentParams = {
  appointmentId: string; // ID du rendez-vous à mettre à jour
  userId: string; // ID de l'utilisateur associé
  appointment: Appointment; // Objet complet du rendez-vous
  type: string; // Type d'opération, par exemple "update" ou "cancel"
};
