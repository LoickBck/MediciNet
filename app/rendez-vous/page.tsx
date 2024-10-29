import PatientForm from "@/components/forms/PatientForm"; // Importation du formulaire de patient personnalisé.
import PasswordModal from "@/components/PasswordModal"; // Importation du composant modal pour la saisie de mot de passe (utilisé par les administrateurs).
import Image from "next/image"; // Importation du composant `Image` de Next.js pour gérer et optimiser les images.
import Link from "next/link"; // Importation du composant `Link` de Next.js pour la navigation interne.

/**
 * Composant `RendezVous` pour afficher une page de prise de rendez-vous avec un formulaire de patient.
 * @param searchParams - Contient les paramètres de recherche depuis l'URL. Utilisé pour vérifier si l'utilisateur est administrateur.
 */
export default function RendezVous({ searchParams }: SearchParamProps) {
  // Vérifie si le paramètre `admin` est présent dans les `searchParams` et s'il est égal à 'true'.
  const isAdmin = searchParams.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {/* Affiche le modal de mot de passe uniquement si l'utilisateur est administrateur */}
      {isAdmin && <PasswordModal />}

      {/* Section principale contenant le formulaire de patient */}
      <section className="remove-scrollbar container mx-auto">
        <div className="sub-container max-w-[496px]">
          {/* Logo avec lien vers la page d'accueil */}
          <Link href="/">
            <Image
              src="/assets/icons/logo-full.svg" // Chemin de l'image du logo.
              height={1000}
              width={1000}
              alt="patient"
              className="mb-12 h-auto max-w-[50%] sm:max-w-[40%] md:max-w-[40%] lg:max-w-[35%]"
            />
          </Link>

          {/* Formulaire de patient pour entrer ou mettre à jour les informations du patient */}
          <PatientForm />

          {/* Section avec copyright et lien pour accéder au mode admin */}
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 MediciNet
            </p>
            {/* Lien vers la même page mais avec l'accès admin activé */}
            <Link
              href="/rendez-vous/?admin=true"
              className="text-green-500 ease-in transition hover:text-green-400"
            >
              Admin
            </Link>
          </div>
        </div>
      </section>

      {/* Image d'illustration sur le côté droit */}
      <Image
        src="/assets/images/onboarding-img.jpg" // Image associée à la page de rendez-vous.
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
