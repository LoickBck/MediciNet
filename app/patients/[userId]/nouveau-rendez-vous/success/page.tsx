import { Button } from "@/components/ui/button"; // Importation du composant de bouton personnalisé.
import { Doctors } from "@/constants"; // Importation de la liste des médecins depuis les constantes.
import { getAppointment } from "@/lib/actions/appointment.actions"; // Importation de la fonction pour récupérer un rendez-vous spécifique.
import { formatDateTime } from "@/lib/utils"; // Importation de la fonction utilitaire pour formater les dates et heures.
import Image from "next/image"; // Importation du composant `Image` de Next.js pour gérer et optimiser les images.
import Link from "next/link"; // Importation du composant `Link` de Next.js pour la navigation interne.

/**
 * Composant de la page de succès après la soumission d'une demande de rendez-vous.
 * Fonction asynchrone qui récupère les détails du rendez-vous en fonction de l'ID fourni.
 * @param params - Contient `userId` (ID de l'utilisateur) et `searchParams` (paramètres de recherche contenant l'ID du rendez-vous).
 */
const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || ""; // Récupère l'ID du rendez-vous à partir des paramètres de recherche.
  const appointment = await getAppointment(appointmentId); // Récupère les détails du rendez-vous via une requête asynchrone.
  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  ); // Trouve le médecin associé au rendez-vous.

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        {/* Logo avec un lien vers la page d'accueil */}
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg" // Chemin du logo à afficher.
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>
        {/* Section affichant le message de succès */}
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif" // GIF de succès affiché pour l'animation visuelle.
            height={300}
            width={280}
            alt="succès"
            unoptimized
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Votre <span className="text-green-500">demande de rendez-vous</span>{" "}
            a été enregistrée avec succès !
          </h2>
          <p>Nous vous contacterons prochainement pour confirmer</p>
        </section>
        {/* Section affichant les détails du rendez-vous demandé */}
        <section className="request-details">
          <p>Détails du rendez-vous demandé :</p>

          {/* Affichage du médecin */}
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image || "/assets/images/admin.png"} // Image par défaut si `image` est undefined
              alt="docteur"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>

          {/* Affichage de la date et heure du rendez-vous */}
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg" // Icône de calendrier pour indiquer la date.
              height={24}
              width={24}
              alt="calendrier"
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>{" "}
            {/* Formatage de la date et heure du rendez-vous */}
          </div>
        </section>
        {/* Bouton pour réserver un nouveau rendez-vous */}
        <Button variant="link" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/nouveau-rendez-vous`}>
            Nouveau rendez-vous
          </Link>
        </Button>
        <p className="copyright">© 2024 MediciNet</p>{" "}
        {/* Texte de copyright en bas de page */}
      </div>
    </div>
  );
};

export default Success; // Exportation par défaut du composant Success pour utilisation ailleurs dans l'application.
