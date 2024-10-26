"use client"; // Directive pour exécuter le composant côté client

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import StatCard from "@/components/StatCard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/table/columns";

const Admin = () => {
  // Ajout de l'état pour stocker les rendez-vous et les informations de chargement
  const [appointments, setAppointments] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données et les définir dans l'état
    const fetchAppointments = async () => {
      try {
        const data = await getRecentAppointmentList();
        setAppointments(data);
      } catch (error) {
        console.error("Erreur lors du chargement des rendez-vous :", error);
      } finally {
        setLoading(false); // Désactive l'état de chargement une fois terminé
      }
    };

    fetchAppointments(); // Exécution de la fonction de récupération de données
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-green-500"></div>
      </div>
    ); // Message pendant le chargement des données

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
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

        <section className="admin-stat">
          <StatCard
            type="programmer"
            count={appointments?.scheduledCount || 0}
            label="Rendez-vous programmés"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="attente"
            count={appointments?.pendingCount || 0}
            label="Rendez-vous en attente"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="annuler"
            count={appointments?.cancelledCount || 0}
            label="Rendez-vous annulés"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        {appointments && (
          <DataTable columns={columns} data={appointments.documents} />
        )}
      </main>
    </div>
  );
};

export default Admin;
