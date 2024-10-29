"use client"; // Directive pour exécuter le composant côté client
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import StatCard from "@/components/StatCard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/table/columns";
import { useRouter } from "next/navigation";
import { decryptKey } from "@/lib/utils"; // Importation de la fonction de décryptage pour vérifier l'accès.

const Admin = () => {
  const router = useRouter();

  // États pour stocker les données des rendez-vous, l'état de chargement et l'autorisation d'accès
  const [appointments, setAppointments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAccessGranted, setIsAccessGranted] = useState(false);

  // Vérifie si l'utilisateur a le droit d'accéder à la page admin
  useEffect(() => {
    const checkAccess = () => {
      const encryptedKey = window.localStorage.getItem("accessPass"); // Récupère l'accessPass crypté dans le stockage local
      if (encryptedKey) {
        const accessPass = decryptKey(encryptedKey); // Décrypte l'accessPass
        if (accessPass === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
          setIsAccessGranted(true); // Si le mot de passe est correct, accorde l'accès
        } else {
          router.push("/rendez-vous?admin=true"); // Redirige vers la page de connexion si le mot de passe est incorrect
        }
      } else {
        router.push("/rendez-vous?admin=true"); // Redirige si aucun accessPass n'est présent
      }
    };

    checkAccess();
  }, [router]);

  // Charge les données des rendez-vous si l'accès est accordé
  useEffect(() => {
    if (isAccessGranted) {
      const fetchAppointments = async () => {
        try {
          const data = await getRecentAppointmentList(); // Récupère la liste des rendez-vous
          setAppointments(data);
        } catch (error) {
          console.error("Erreur lors du chargement des rendez-vous :", error);
        } finally {
          setLoading(false); // Désactive l'état de chargement une fois terminé
        }
      };

      fetchAppointments(); // Exécution de la fonction de récupération de données
    }
  }, [isAccessGranted]);

  // N'affiche rien si l'accès n'est pas validé
  if (!isAccessGranted) {
    return null;
  }

  // Affiche un spinner pendant le chargement des données
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-green-500"></div>
      </div>
    );

  // Affichage du contenu principal de la page d'administration
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      {/* En-tête de la page avec le logo et le titre */}
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        {/* Section d'accueil avec un message de bienvenue */}
        <section className="w-full space-y-4">
          <h1 className="header">Bienvenue 👋</h1>
          <p className="text-dark-700">
            Commencez la journée en gérant les nouveaux rendez-vous
          </p>
          <div className="mt-4">
            <Link href="/admin/patients">
              <button className="group relative inline-flex items-center justify-center overflow-hidden border-2 border-green-500 p-4 px-6 py-3 font-medium text-green-600 shadow-md transition duration-300 ease-out hover:border-4 hover:border-double rounded-lg">
                <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-green-500 text-white duration-300 group-hover:translate-x-0">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="ease absolute flex h-full w-full transform items-center justify-center text-green-500 transition-all duration-300 group-hover:translate-x-full">
                  Informations des patients
                </span>
                <span className="invisible relative">
                  Informations des patients
                </span>
              </button>
            </Link>
          </div>
        </section>

        {/* Section de statistiques sur les rendez-vous */}
        <section className="admin-stat">
          <StatCard
            type="programmer"
            //@ts-expect-error: Erreur typescript mais pas une erreur
            count={appointments?.scheduledCount || 0}
            label="Rendez-vous programmés"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="attente"
            //@ts-expect-error: Erreur typescript mais pas une erreur
            count={appointments?.pendingCount || 0}
            label="Rendez-vous en attente"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="annuler"
            //@ts-expect-error: Erreur typescript mais pas une erreur
            count={appointments?.cancelledCount || 0}
            label="Rendez-vous annulés"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        {/* Table de données pour afficher la liste des rendez-vous */}
        {appointments && (
          //@ts-expect-error: Erreur typescript mais pas une erreur
          <DataTable columns={columns} data={appointments.documents} />
        )}
      </main>
    </div>
  );
};

export default Admin;
