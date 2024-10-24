import React from "react"; // Importation de React pour définir des composants React.
import Image from "next/image"; // Importation du composant `Image` de Next.js pour gérer et optimiser les images.
import Link from "next/link"; // Importation du composant `Link` de Next.js pour la navigation interne.
import RegisterForm from "@/components/forms/RegisterForm"; // Importation du formulaire d'enregistrement personnalisé.
import { getUser } from "@/lib/actions/patient.actions"; // Importation de la fonction pour récupérer les informations d'un utilisateur spécifique.

/**
 * Composant `Register` pour afficher la page d'inscription d'un utilisateur/patient.
 * Fonction asynchrone qui récupère les informations de l'utilisateur à partir de l'ID utilisateur fourni.
 * @param params - Contient `userId` pour identifier l'utilisateur.
 */
const Register = async ({ params: { userId } }: SearchParamProps) => {
  // Récupère les informations de l'utilisateur via une requête asynchrone.
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      {/* Section principale avec le formulaire d'inscription */}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          {/* Logo du site avec un espacement en bas */}
          <Image
            src="/assets/icons/logo-full.svg" // Chemin de l'image du logo.
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          {/* Formulaire d'enregistrement avec les informations utilisateur pré-remplies */}
          <RegisterForm user={user} />

          {/* Texte de copyright en bas de la section */}
          <p className="copyright py-12">© 2024 MediciNet</p>
        </div>
      </section>

      {/* Image d'illustration sur le côté droit */}
      <Image
        src="/assets/images/register-img.png" // Image associée à la page d'enregistrement.
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register; // Exportation par défaut du composant `Register` pour être utilisé ailleurs dans l'application.
