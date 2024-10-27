// actions/updatePatient.ts

"use server";

import {
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  databases,
} from "../appwrite.config";
import { Patient } from "@/types/appwrite.types"; // Assurez-vous que ce type est importé

export const updatePatient = async (
  patientId: string,
  data: any
): Promise<Patient> => {
  try {
    const updatedPatient = await databases.updateDocument<Patient>(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      patientId,
      data
    );
    console.log("Patient mis à jour avec succès.");
    return updatedPatient; // Retourne le patient mis à jour
  } catch (error) {
    console.error("Erreur lors de la mise à jour du patient:", error);
    throw new Error("Impossible de mettre à jour le patient.");
  }
};
