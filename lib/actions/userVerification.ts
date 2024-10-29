"use server";
import {
  databases,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
} from "../appwrite.config";
import { Query } from "node-appwrite";

/**
 * Vérifie si un utilisateur existe déjà dans la base de données en fonction de son email et téléphone.
 * @param email - L'email de l'utilisateur à vérifier.
 * @param phone - Le numéro de téléphone de l'utilisateur à vérifier.
 * @returns L'utilisateur si trouvé, sinon null.
 */
export const checkUserExists = async (email: string, phone: string) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("email", email), Query.equal("phone", phone)]
    );

    return response.documents.length > 0 ? response.documents[0] : null;
  } catch (error) {
    console.error(
      "Erreur lors de la vérification de l'existence de l'utilisateur:",
      error
    );
    return null;
  }
};
