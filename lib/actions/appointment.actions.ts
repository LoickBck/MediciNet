"use server"; // Directive indiquant que ce fichier est destiné à être exécuté côté serveur.

import { ID, Query } from "node-appwrite"; // Importation des modules ID et Query depuis la bibliothèque node-appwrite.
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from "../appwrite.config"; // Importation des configurations Appwrite pour les bases de données et la messagerie.
import { formatDateTime, parseStringify } from "../utils"; // Importation des fonctions utilitaires pour formater les dates et sérialiser/désérialiser les données.
import { Appointment } from "@/types/appwrite.types"; // Importation du type Appointment défini dans le projet.
import { revalidatePath } from "next/cache"; // Fonction pour revalider le cache d'une route spécifique dans Next.js.

/**
 * Fonction pour créer un rendez-vous.
 * @param appointment - Les paramètres du rendez-vous à créer.
 * @returns Le rendez-vous nouvellement créé après sérialisation.
 */
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment); // Retourne l'objet sérialisé du nouveau rendez-vous.
  } catch (error) {
    console.log(error); // Affiche une erreur s'il y a un problème lors de la création du rendez-vous.
  }
};

/**
 * Fonction pour récupérer un rendez-vous par son ID.
 * @param appointmentId - L'ID du rendez-vous à récupérer.
 * @returns Les détails du rendez-vous après sérialisation.
 */
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment); // Retourne les détails du rendez-vous sous forme sérialisée.
  } catch (error) {
    console.log(error); // Affiche une erreur si le rendez-vous n'a pas pu être récupéré.
  }
};

/**
 * Fonction pour obtenir la liste des rendez-vous récents.
 * @returns La liste des rendez-vous récents, classés par date de création décroissante, avec des statistiques.
 */
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")] // Trie les rendez-vous par ordre décroissant de création.
    );

    const initialCount = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    // Comptabilise les rendez-vous en fonction de leur statut.
    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "programmé") {
          acc.scheduledCount += 1;
        } else if (appointment.status === "attente") {
          acc.pendingCount += 1;
        } else if (appointment.status === "annulé") {
          acc.cancelledCount += 1;
        }
        return acc;
      },
      initialCount
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data); // Retourne les rendez-vous avec des informations supplémentaires après sérialisation.
  } catch (error) {
    console.log(error); // Affiche une erreur si la liste des rendez-vous n'a pas pu être obtenue.
  }
};

/**
 * Fonction pour mettre à jour un rendez-vous et envoyer une notification SMS.
 * @param params - Les paramètres pour la mise à jour, incluant l'ID, les détails du rendez-vous, et le type de mise à jour.
 * @returns Les informations du rendez-vous mis à jour après sérialisation.
 */
export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updateAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updateAppointment) {
      throw new Error("Rendez-vous introuvable"); // Génère une erreur si le rendez-vous n'a pas été trouvé.
    }

    // Message SMS à envoyer en fonction du type d'opération (programmation ou annulation).
    const smsMessage = `
        Bonjour, vous avez un message de MediciNet.
        ${
          type === "programmer"
            ? `Votre rendez-vous à été programmé pour le ${
                formatDateTime(appointment.schedule!).dateTime
              } avec le Dr.${appointment.primaryPhysician}.`
            : `Nous sommes désolé de vous informer que votre rendez-vous à été annulé. Pour la raison suivante: ${appointment.cancellationReason}`
        }`;

    await sendSMSNotification(userId, smsMessage); // Envoie un SMS au patient.

    revalidatePath("/admin"); // Revalide la page d'administration pour mettre à jour les données en cache.
    return parseStringify(updateAppointment); // Retourne les informations mises à jour après sérialisation.
  } catch (error) {
    console.log(error); // Affiche une erreur s'il y a un problème lors de la mise à jour.
  }
};

/**
 * Fonction pour envoyer une notification SMS à un utilisateur.
 * @param userId - L'ID de l'utilisateur à notifier.
 * @param content - Le contenu du message SMS.
 * @returns Les informations du message envoyé après sérialisation.
 */
export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [], // Paramètre de liste de numéros non utilisé, supposé être vide.
      [userId] // Envoie le SMS à l'utilisateur spécifié.
    );

    return parseStringify(message); // Retourne les détails du message envoyé après sérialisation.
  } catch (error) {
    console.log(error); // Affiche une erreur si l'envoi du SMS échoue.
  }
};
