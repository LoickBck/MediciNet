"use client"; // Directive indiquant que ce composant est destiné à être exécuté côté client.

import { zodResolver } from "@hookform/resolvers/zod"; // Importation du résolveur Zod pour la validation des formulaires avec React Hook Form.
import { useForm } from "react-hook-form"; // Importation du hook `useForm` pour gérer les formulaires dans React.
import { z } from "zod"; // Importation de la bibliothèque Zod pour définir des schémas de validation.
import { Form } from "@/components/ui/form"; // Importation du composant `Form` pour structurer les formulaires.
import CustomFormField from "../CustomFormField"; // Importation du composant de champ personnalisé.
import SubmitButton from "../SubmitButton"; // Importation du bouton de soumission personnalisé.
import { useState } from "react"; // Importation du hook `useState` pour gérer l'état local.
import { getAppointmentSchema } from "@/lib/validation"; // Importation de la fonction pour obtenir le schéma de validation des rendez-vous.
import { useRouter } from "next/navigation"; // Importation du hook `useRouter` pour la navigation dans Next.js.
import { FormFieldType } from "./PatientForm"; // Importation des types de champs utilisés dans le formulaire patient.
import { Doctors } from "@/constants"; // Importation de la liste des médecins définie dans les constantes.
import { SelectItem } from "../ui/select"; // Importation du composant pour les éléments de sélection.
import Image from "next/image"; // Importation du composant `Image` de Next.js pour optimiser les images.
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions"; // Importation des fonctions pour créer et mettre à jour les rendez-vous.
import { Appointment } from "@/types/appwrite.types"; // Importation du type `Appointment`.

/**
 * Composant `AppointmentForm` pour gérer la création, l'annulation et la programmation des rendez-vous.
 * @param userId - ID de l'utilisateur lié au rendez-vous.
 * @param patientId - ID du patient pour lequel le rendez-vous est créé.
 * @param type - Type d'opération : "créer", "annuler" ou "programmer".
 * @param appointment - (Optionnel) Informations sur le rendez-vous à mettre à jour ou annuler.
 * @param setOpen - Fonction pour gérer l'état d'ouverture d'un modal.
 */
const AppointmentForm = ({
  userId,
  patientId,
  patientName,
  type,
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  patientName: string;
  type: "créer" | "annuler" | "programmer";
  appointment?: Appointment;
  setOpen: (open: boolean) => void;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // État pour indiquer si une opération est en cours de chargement.
  const AppointmentFormValidation = getAppointmentSchema(type); // Récupère le schéma de validation basé sur le type de rendez-vous.

  // Initialisation du formulaire avec des valeurs par défaut et un schéma de validation.
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment && appointment.primaryPhysician,
      schedule: appointment
        ? new Date(appointment?.schedule)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  // Fonction pour gérer la soumission du formulaire.
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    console.log("onSubmit appelé avec les valeurs :", values);
    console.log("Type de soumission :", type);
    setIsLoading(true); // Active l'état de chargement.

    let status;
    switch (type) {
      case "programmer":
        status = "programmé";
        break;
      case "annuler":
        status = "annulé";
        break;
      default:
        status = "attente";
        break;
    }
    console.log({ type });

    try {
      if (type === "créer" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          patientName,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        };
        const appointment = await createAppointment(appointmentData); // Création d'un nouveau rendez-vous.

        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/nouveau-rendez-vous/success?appointmentId=${appointment.$id}`
          ); // Redirection après la création.
        }
      } else {
        console.log("Modification des RDV");
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(values?.schedule),
            status: status as Status,
            cancellationReason: values?.cancellationReason,
          },
          type,
        };
        const updatedAppointment = await updateAppointment(appointmentToUpdate); // Mise à jour ou annulation du rendez-vous.

        if (updatedAppointment) {
          setOpen && setOpen(false); // Ferme le modal si présent.
          form.reset();
        }
      }
    } catch (error) {
      console.log(error); // Affiche les erreurs éventuelles.
    }

    setIsLoading(false); // Désactive l'état de chargement.
  }

  // Détermine le libellé du bouton en fonction du type d'opération.
  let buttonLabel;
  switch (type) {
    case "annuler":
      buttonLabel = "Annulez le rendez-vous";
      break;
    case "créer":
      buttonLabel = "Créer le rendez-vous";
      break;
    case "programmer":
      buttonLabel = "Programmer le rendez-vous";
      break;
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === "créer" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">Nouveau rendez-vous</h1>
            <p className="text-dark-700">
              Programmez votre prochain rendez-vous en 10 secondes
            </p>
          </section>
        )}

        {type !== "annuler" && (
          <>
            {/* Sélection du médecin */}
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Médecin"
              placeholder="Sélectionner un médecin"
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt={doctor.name}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            {/* Sélection de la date et heure */}
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Date de rendez-vous prévue"
              showTimeSelect
              dateFormat="dd/MM/yyyy - h:mm aa"
            />

            {/* Raisons et remarques spécifiques */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Raison du rendez-vous"
                placeholder="Entrez la raison de votre demande de rendez-vous"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Remarques spécifiques"
                placeholder="Si vous avez des remarques spécifiques"
              />
            </div>
          </>
        )}

        {type === "annuler" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Raison de l'annulation du rendez-vous"
            placeholder="Entrez la raison de l'annulation du rendez-vous"
          />
        )}

        {/* Bouton de soumission */}
        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "annuler" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
