import Link from "next/link"; // Importation du composant `Link` de Next.js pour la navigation interne.
import Image from "next/image"; // Importation du composant `Image` de Next.js pour l'optimisation des images.
import StatCard from "@/components/StatCard"; // Importation du composant personnalisé `StatCard` pour afficher les statistiques.
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions"; // Importation de la fonction pour obtenir la liste des rendez-vous récents.
import { DataTable } from "@/components/DataTable"; // Importation du composant `DataTable` pour afficher les données sous forme de tableau.
import { columns } from "@/components/table/columns"; // Importation des définitions de colonnes pour le tableau de données.

/**
 * Composant de la page d'administration.
 * Fonction asynchrone qui récupère la liste des rendez-vous récents et affiche un tableau de bord avec des statistiques et un tableau des rendez-vous.
 */
const Admin = async () => {
  // Récupère la liste des rendez-vous récents avec les statistiques (programmés, en attente, annulés).
  const appointments = await getRecentAppointmentList();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      {/* En-tête de la page d'administration */}
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg" // Logo du site affiché dans l'en-tête.
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>{" "}
        {/* Titre du tableau de bord */}
      </header>

      {/* Contenu principal de la page d'administration */}
      <main className="admin-main">
        {/* Section de bienvenue avec un message d'accueil */}
        <section className="w-full space-y-4">
          <h1 className="header">Bienvenue 👋</h1>
          <p className="text-dark-700">
            Commencez la journée en gérant les nouveaux rendez-vous
          </p>
        </section>

        {/* Section des statistiques avec les cartes de statut des rendez-vous */}
        <section className="admin-stat">
          <StatCard
            type="programmer"
            count={appointments.scheduledCount} // Affiche le nombre de rendez-vous programmés.
            label="Rendez-vous programmés"
            icon="/assets/icons/appointments.svg" // Icône associée.
          />
          <StatCard
            type="attente"
            count={appointments.pendingCount} // Affiche le nombre de rendez-vous en attente.
            label="Rendez-vous en attente"
            icon="/assets/icons/pending.svg" // Icône associée.
          />
          <StatCard
            type="annuler"
            count={appointments.cancelledCount} // Affiche le nombre de rendez-vous annulés.
            label="Rendez-vous annulés"
            icon="/assets/icons/cancelled.svg" // Icône associée.
          />
        </section>

        {/* Tableau de données des rendez-vous */}
        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default Admin; // Exportation par défaut du composant Admin pour être utilisé dans d'autres parties de l'application.
