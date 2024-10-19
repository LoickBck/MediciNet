'use server'

import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases, messaging } from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointment
          );
      
          return parseStringify(newAppointment);
    } catch (error) {
        console.log(error);
    }
}

export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
        )

        return parseStringify(appointment);
    } catch (error) {
        console.log(error);
    }
}

export const getRecentAppointmentList = async () => {
    try {
        const appointments = await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        );

        const initialCount = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0,
        }

        const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
            if (appointment.status === 'programmé') {
                acc.scheduledCount += 1;
            } else if (appointment.status === 'attente') {
                acc.pendingCount += 1;
            } else if (appointment.status === 'annulé') {
                acc.cancelledCount += 1;
            }
            return acc;
        }, initialCount);

        const data = {
            totalCount: appointments.total,
            ...counts,
            documents: appointments.documents
        }

        return parseStringify(data);
    } catch (error) {
        console.log(error);
    }
}

export const updateAppointment = async ({ appointmentId, userId, appointment, type}: UpdateAppointmentParams) => {
    try {
        const updateAppointment = await databases.updateDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId, 
            appointment
        )

        if(!updateAppointment) {
            throw new Error('Rendez-vous introuvable');
        }

        const smsMessage = `
        Bonjour, vous avez un message de MediciNet.
        ${type === 'programmer' 
            ? `Votre rendez-vous à été programmé pour le ${formatDateTime(appointment.schedule!).dateTime} avec le Dr.${appointment.primaryPhysician}.`
            : `Nous sommes désolé de vous informer que votre rendez-vous à été annulé. Pour la raison suivante: ${appointment.cancellationReason}`
        }`

        await sendSMSNotification(userId, smsMessage);

        revalidatePath('/admin');
        return parseStringify(updateAppointment);
    } catch (error) {
        console.log(error);
    }
}

export const sendSMSNotification = async ( userId: string, content: string ) => {
    try {
        const message = await messaging.createSms(
            ID.unique(),
            content,
            [],
            [userId]
        )

        return parseStringify(message);
    } catch (error) {
        console.log(error)
    }
}

