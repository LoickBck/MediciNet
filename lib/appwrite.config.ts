import * as sdk from "node-appwrite"; // Importation de tous les modules de la bibliothèque Appwrite sous forme d'un objet nommé `sdk`.

/**
 * Extraction des variables d'environnement utilisées pour la configuration.
 * Ces variables doivent être définies dans le fichier d'environnement (par exemple, `.env`).
 * Elles incluent :
 * - ENDPOINT : L'URL de l'API Appwrite.
 * - PROJECT_ID : L'ID du projet Appwrite.
 * - API_KEY : La clé API utilisée pour s'authentifier.
 * - DATABASE_ID : L'ID de la base de données Appwrite.
 * - PATIENT_COLLECTION_ID : L'ID de la collection des patients.
 * - DOCTOR_COLLECTION_ID : L'ID de la collection des docteurs.
 * - APPOINTMENT_COLLECTION_ID : L'ID de la collection des rendez-vous.
 * - BUCKET_ID : L'ID du bucket de stockage.
 */
export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

const client = new sdk.Client(); // Création d'une instance de client Appwrite.

/**
 * Configuration du client Appwrite :
 * - `setEndpoint(ENDPOINT!)` : Définit l'URL de l'API Appwrite (ENDPOINT).
 * - `setProject(PROJECT_ID!)` : Définit l'ID du projet Appwrite (PROJECT_ID).
 * - `setKey(API_KEY!)` : Définit la clé API pour authentifier les requêtes (API_KEY).
 */
client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

/**
 * Exportation des services Appwrite pour interagir avec différentes fonctionnalités :
 * - `databases` : Utilisé pour interagir avec les bases de données Appwrite (CRUD).
 * - `users` : Utilisé pour gérer les utilisateurs dans Appwrite.
 * - `messaging` : Utilisé pour envoyer des messages (SMS, notifications) via Appwrite.
 * - `storage` : Utilisé pour gérer les fichiers stockés dans les buckets Appwrite.
 */
export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
