import AppointmentForm from "@/components/forms/AppointmentForm"; // Importation du formulaire de rendez-vous.
import { getPatient } from "@/lib/actions/patient.actions"; // Importation de la fonction pour récupérer les informations du patient.
import Image from "next/image"; // Importation du composant `Image` de Next.js pour gérer et optimiser les images.
import Link from "next/link";

/**
 * Composant `NewAppointment` pour créer un nouveau rendez-vous pour un patient.
 * Fonction asynchrone qui récupère les informations du patient en fonction de l'ID utilisateur fourni dans les paramètres.
 * @param params - Contient `userId` (ID de l'utilisateur pour identifier le patient).
 */
export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  try {
    const patient = await getPatient(userId); // Récupère les informations du patient en utilisant l'ID utilisateur.

    if (!patient) {
      // Affiche un message si le patient n'est pas trouvé.
      return (
        <div className="flex h-screen items-center justify-center">
          <p>Patient non trouvé. Veuillez vérifier l&apos;ID du patient.</p>
        </div>
      );
    }

    return (
      <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[860px] flex-1 justify-between">
            {/* Logo avec un espacement en bas */}
            <Link href="/">
              <Image
                src="/assets/icons/logo-full.svg"
                height={1000}
                width={1000}
                alt="patient"
                className="mb-12 h-auto max-w-[50%] sm:max-w-[40%] md:max-w-[40%] lg:max-w-[35%]"
              />
            </Link>
            {/* Formulaire de création de rendez-vous 
            //@ts-expect-error: Ignorer les erreurs TypeScript pour l'importation d'AppointmentForm.*/}
            <AppointmentForm
              type="créer" // Définit le type d'opération (créer un rendez-vous).
              userId={userId} // Passe l'ID utilisateur au formulaire.
              patientId={patient.$id} // Passe l'ID du patient récupéré au formulaire.
            />
            <p className="copyright mt-10 py-12">
              ©2024 <Link href="https://buckloick.com/">Loick Buck</Link>
            </p>{" "}
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
  } catch (error) {
    console.error("Erreur lors de la récupération du patient:", error);
    return (
      <div className="flex h-screen items-center justify-center">
        <p>
          Erreur lors du chargement des informations du patient. Veuillez
          réessayer plus tard.
        </p>
      </div>
    );
  }
}
