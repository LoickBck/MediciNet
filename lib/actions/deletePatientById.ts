"use server";

import { Query } from "node-appwrite";
import {
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  databases,
} from "../appwrite.config";

export const deletePatientById = async (userId: string): Promise<void> => {
  try {
    // Récupère le document correspondant au userId
    const response = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );

    if (response.documents.length === 0) {
      throw new Error("Aucun document correspondant trouvé.");
    }

    const documentId = response.documents[0].$id; // Utilisez l'ID du document trouvé

    // Supprime le document
    await databases.deleteDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      documentId
    );
    console.log(
      `Patient avec l'ID utilisateur ${userId} supprimé avec succès.`
    );
  } catch (error) {
    console.error("Erreur lors de la suppression du patient:", error);
    throw new Error("Impossible de supprimer le patient.");
  }
};
