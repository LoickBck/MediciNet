"use client"; // Directive indiquant que ce composant est destiné à être exécuté côté client.

import { zodResolver } from "@hookform/resolvers/zod"; // Importation du résolveur Zod pour la validation des formulaires avec React Hook Form.
import { useForm } from "react-hook-form"; // Importation du hook `useForm` pour gérer les formulaires dans React.
import { z } from "zod"; // Importation de la bibliothèque Zod pour définir des schémas de validation.
import { Form } from "@/components/ui/form"; // Importation du composant `Form` pour structurer les formulaires.
import CustomFormField from "../CustomFormField"; // Importation du composant de champ personnalisé.
import SubmitButton from "../SubmitButton"; // Importation du bouton de soumission personnalisé.
import { useState } from "react"; // Importation du hook `useState` pour gérer l'état local.
import { UserFormValidation } from "@/lib/validation"; // Importation du schéma de validation des utilisateurs.
import { useRouter } from "next/navigation"; // Importation du hook `useRouter` pour la navigation dans Next.js.
import { createUser } from "@/lib/actions/patient.actions"; // Importation de la fonction pour créer un nouvel utilisateur.

/**
 * Énumération pour les types de champs de formulaire.
 * Utilisée pour définir les différents types de champs acceptés par `CustomFormField`.
 */
export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

/**
 * Composant `PatientForm` pour gérer l'inscription d'un nouveau patient.
 * Ce formulaire permet de collecter le nom, l'email et le téléphone d'un utilisateur pour créer un nouvel enregistrement de patient.
 */
const PatientForm = () => {
  const router = useRouter(); // Initialisation du hook de navigation.
  const [isLoading, setIsLoading] = useState(false); // État pour indiquer si une opération est en cours de chargement.

  // Initialisation du formulaire avec des valeurs par défaut et un schéma de validation.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  /**
   * Fonction pour gérer la soumission du formulaire.
   * @param values - Valeurs du formulaire après validation.
   */
  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true); // Active l'état de chargement.

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user); // Appelle la fonction pour créer un nouvel utilisateur.

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`); // Redirection vers la page d'inscription du patient après la création.
      }
    } catch (error) {
      console.log(error); // Affiche les erreurs éventuelles.
    }

    setIsLoading(false); // Désactive l'état de chargement.
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {/* Section d'introduction */}
        <section className="mb-12 space-y-4">
          <h1 className="header">Bonjour👋,</h1>
          <p className="text-dark-700">Débutez avec les rendez-vous.</p>
        </section>

        {/* Champ pour entrer le nom complet */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Nom complet"
          placeholder="Lionel Messi"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        {/* Champ pour entrer l'email */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Adresse email"
          placeholder="ballondoràvie@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="user"
        />

        {/* Champ pour entrer le numéro de téléphone */}
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Téléphone"
          placeholder="+32 412 34 56 78"
          iconSrc="/assets/icons/email.svg"
          iconAlt="user"
        />

        {/* Bouton de soumission du formulaire */}
        <SubmitButton isLoading={isLoading}>Commencer</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm; // Exportation du composant pour être utilisé ailleurs dans l'application.
