import AppointmentForm from "@/components/forms/AppointmentForm"; // Importation du formulaire de rendez-vous.
import { getPatient } from "@/lib/actions/patient.actions"; // Importation de la fonction pour récupérer les informations du patient.
import Image from "next/image"; // Importation du composant `Image` de Next.js pour gérer et optimiser les images.

/**
 * Composant `NewAppointment` pour créer un nouveau rendez-vous pour un patient.
 * Fonction asynchrone qui récupère les informations du patient en fonction de l'ID utilisateur fourni dans les paramètres.
 * @param params - Contient `userId` (ID de l'utilisateur pour identifier le patient).
 */
export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  const patient = await getPatient(userId); // Récupère les informations du patient en utilisant l'ID utilisateur.

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          {/* Logo avec un espacement en bas */}
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          {/* Formulaire de création de rendez-vous 
          //@ts-ignore - Ignorer les erreurs TypeScript pour l'importation d'AppointmentForm.*/}
          <AppointmentForm
            type="créer" // Définit le type d'opération (créer un rendez-vous).
            userId={userId} // Passe l'ID utilisateur au formulaire.
            patientId={patient.$id} // Passe l'ID du patient récupéré au formulaire.
          />
          <p className="copyright mt-10 py-12">© 2024 MediciNet</p>{" "}
          {/* Texte de copyright en bas */}
        </div>
      </section>

      {/* Image d'illustration sur le côté droit */}
      <Image
        src="/assets/images/appointments-img.png" // Image représentant les rendez-vous.
        height={1000}
        width={1000}
        alt="rendez-vous"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
