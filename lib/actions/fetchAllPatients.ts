"use server"; // Directive indiquant que ce fichier est destiné à être exécuté côté serveur.

import {
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  databases,
} from "../appwrite.config"; // Importation des configurations Appwrite pour la gestion des utilisateurs, bases de données et stockage.
import { parseStringify } from "../utils"; // Importation d'une fonction utilitaire pour sérialiser/désérialiser les données.
import { Patient } from "@/types/appwrite.types"; // Import du type Patient pour un typage strict

// Fonctions existantes (comme `createUser`, `getUser`, `registerPatient`, et `getPatient`)...

/**
 * Fonction pour récupérer tous les patients de la base de données.
 * @returns Un tableau de patients sérialisé pour compatibilité côté client.
 */
export const fetchAllPatients = async (): Promise<Patient[]> => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!
    );

    // Sérialiser les données pour compatibilité avec le rendu côté client
    return parseStringify(response.documents) as Patient[];
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de tous les patients:",
      error
    );
    throw new Error("Impossible de récupérer les patients.");
  }
};
