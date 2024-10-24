"use server"; // Directive indiquant que ce fichier est destiné à être exécuté côté serveur.

import { ID, Query } from "node-appwrite"; // Importation des modules ID et Query depuis la bibliothèque node-appwrite.
import { InputFile } from "node-appwrite/file"; // Importation du module InputFile pour gérer les fichiers.

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config"; // Importation des configurations Appwrite pour la gestion des utilisateurs, bases de données et stockage.
import { parseStringify } from "../utils"; // Importation d'une fonction utilitaire pour sérialiser/désérialiser les données.

/**
 * Fonction pour créer un utilisateur Appwrite.
 * @param user - Les paramètres nécessaires pour créer un utilisateur.
 * @returns L'utilisateur nouvellement créé ou un utilisateur existant si l'email est déjà utilisé.
 */
export const createUser = async (user: CreateUserParams) => {
  try {
    // Créer un nouvel utilisateur -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined, // Mot de passe non défini, peut être configuré plus tard.
      user.name
    );

    return parseStringify(newUser); // Retourne l'utilisateur après sérialisation.
  } catch (error: any) {
    // Vérifie si un utilisateur existe déjà avec l'email donné.
    if (error && error?.code === 409) {
      // Code 409 : Conflit (utilisateur existant)
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0]; // Retourne l'utilisateur existant si trouvé.
    }
    console.error(
      "Une erreur s'est produite lors de la création d'un nouvel utilisateur:",
      error // Affiche une erreur en cas de problème lors de la création de l'utilisateur.
    );
  }
};

/**
 * Fonction pour récupérer un utilisateur Appwrite par son ID.
 * @param userId - L'ID de l'utilisateur à récupérer.
 * @returns Les détails de l'utilisateur après sérialisation.
 */
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user); // Retourne les informations de l'utilisateur.
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des détails de l'utilisateur:",
      error // Affiche une erreur si les détails de l'utilisateur ne peuvent être récupérés.
    );
  }
};

/**
 * Fonction pour enregistrer un patient.
 * @param identificationDocument - Document d'identification du patient.
 * @param patient - Autres informations sur le patient.
 * @returns Le document nouvellement créé pour le patient après sérialisation.
 */
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // Téléchargement du fichier de document d'identification du patient -> https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob, // Convertit le fichier en buffer pour le stockage.
        identificationDocument?.get("fileName") as string // Nom du fichier.
      );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile); // Crée le fichier dans le stockage Appwrite.
    }

    // Créer un document pour le patient dans la base de données -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null, // Stocke l'ID du document d'identification si présent.
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`, // Génère l'URL pour visualiser le document d'identification.
        ...patient, // Autres informations du patient.
      }
    );

    return parseStringify(newPatient); // Retourne les informations du patient après sérialisation.
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la création d'un nouveau patient:",
      error // Affiche une erreur si l'enregistrement du patient échoue.
    );
  }
};

/**
 * Fonction pour récupérer un patient par l'ID utilisateur.
 * @param userId - L'ID de l'utilisateur lié au patient.
 * @returns Les informations du patient après sérialisation.
 */
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])] // Filtre pour trouver le patient correspondant à l'ID utilisateur.
    );

    return parseStringify(patients.documents[0]); // Retourne le premier document correspondant.
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des informations du patient:",
      error // Affiche une erreur si les informations du patient ne peuvent être récupérées.
    );
  }
};
