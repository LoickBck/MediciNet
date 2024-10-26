"use server";

import { Query } from "node-appwrite";
import {
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";

/**
 * Fonction pour récupérer un patient par l'ID utilisateur.
 * @param userId - L'ID de l'utilisateur lié au patient.
 * @returns Les informations du patient ou null si non trouvé.
 */
export const fetchPatientByUserId = async (userId: string) => {
  try {
    // Vérification que userId est défini et de type string
    if (!userId || typeof userId !== "string") {
      throw new Error(
        "userId est requis et doit être une chaîne de caractères."
      );
    }

    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])] // Passe userId dans un tableau
    );

    if (!patients.documents.length) {
      console.warn(`Aucun patient trouvé avec userId: ${userId}`);
      return null;
    }

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations du patient:",
      error
    );
    throw error;
  }
};
