"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import { Patient } from "@/types/appwrite.types";
import { deletePatientById } from "@/lib/actions/deletePatientById";
import { fetchAllPatients } from "@/lib/actions/fetchAllPatients";
import { fetchPatientByUserId } from "@/lib/actions/FetchPatientByUserId";
import { PatientModal } from "@/components/PatientModal";
import { toast } from "sonner";

const PatientDetailsPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetchAllPatients();
        setPatients(response || []);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des patients :",
          error
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handlePatientSelect = async (userId: string) => {
    if (userId) {
      try {
        const patientDetails = await fetchPatientByUserId(userId);
        setSelectedPatient(patientDetails);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du patient :",
          error
        );
      }
    } else {
      setSelectedPatient(null);
    }
  };

  const confirmDelete = async () => {
    if (!selectedPatient) return;
    try {
      await deletePatientById(selectedPatient.userId);
      toast.success("Patient supprimé avec succès !");
      setPatients((prev) =>
        prev.filter((patient) => patient.userId !== selectedPatient.userId)
      );
      setSelectedPatient(null);
    } catch (error) {
      toast.error("Erreur lors de la suppression du patient.", {
        description: "Une erreur s'est produite. Veuillez réessayer.",
      });
      console.error("Erreur lors de la suppression du patient :", error);
    }
  };

  const handleDeletePatient = () => {
    toast.warning("Voulez-vous vraiment supprimer ce patient ?", {
      description: "Cette action est irréversible.",
      action: { label: "Valider", onClick: confirmDelete },
    });
  };

  const handleEditPatient = () => {
    setIsModalOpen(true);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-green-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-auto"
          />
        </Link>
        <p className="text-16-semibold">Admin - Infos des Patients</p>
      </header>

      <div className="container mx-auto mt-10">
        <div className="flex flex-col items-center">
          <Link href="/admin" className="mb-4">
            <button className="group relative inline-flex items-center justify-center overflow-hidden border-2 border-green-500 p-4 px-6 py-3 font-medium text-green-600 shadow-md transition duration-300 ease-out hover:border-4 hover:border-double rounded-lg">
              <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-green-500 text-white duration-300 group-hover:translate-x-0">
                <svg
                  className="h-6 w-6 rotate-180"
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
                  />
                </svg>
              </span>
              <span className="ease absolute flex h-full w-full transform items-center justify-center text-green-500 transition-all duration-300 group-hover:translate-x-full">
                Retour
              </span>
              <span className="invisible relative">Retour</span>
            </button>
          </Link>

          <h1 className="text-3xl font-bold mb-6">Détails du Patient</h1>

          <select
            onChange={(e) => handlePatientSelect(e.target.value)}
            defaultValue=""
            className="mb-6 p-2 border border-gray-300 rounded w-full max-w-md"
          >
            <option value="" disabled>
              Sélectionner un patient
            </option>
            {patients.map((patient) => (
              <option key={patient.userId} value={patient.userId}>
                {patient.name}
              </option>
            ))}
          </select>

          {selectedPatient && (
            <div className="p-6 w-full max-w-3xl">
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-white">
                  Informations Personnelles
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-400">
                  Détails personnels et informations supplémentaires.
                </p>
              </div>
              <div className="mt-6 border-t border-gray-600">
                <dl className="divide-y divide-gray-600">
                  {[
                    { label: "Nom", value: selectedPatient.name },
                    { label: "Email", value: selectedPatient.email },
                    { label: "Téléphone", value: selectedPatient.phone },
                    { label: "Genre", value: selectedPatient.gender },
                    {
                      label: "Date de Naissance",
                      value: new Date(
                        selectedPatient.birthDate
                      ).toLocaleDateString(),
                    },
                    { label: "Adresse", value: selectedPatient.address },
                    {
                      label: "Contact d'Urgence",
                      value: `${selectedPatient.emergencyContactName} - ${selectedPatient.emergencyContactNumber}`,
                    },
                    {
                      label: "Mutualité",
                      value: selectedPatient.insuranceProvider,
                    },
                    {
                      label: "Numéro d'affiliation",
                      value: selectedPatient.insurancePolicyNumber,
                    },
                    { label: "Allergies", value: selectedPatient.allergies },
                    {
                      label: "Médicaments Actuels",
                      value: selectedPatient.currentMedication,
                    },
                    {
                      label: "Historique Médical Familial",
                      value: selectedPatient.familyMedicalHistory,
                    },
                    {
                      label: "Historique Médical Passé",
                      value: selectedPatient.pastMedicalHistory,
                    },
                    {
                      label: "Type d'Identification",
                      value: selectedPatient.identificationType,
                    },
                    {
                      label: "Numéro d'Identification",
                      value: selectedPatient.identificationNumber,
                    },
                    {
                      label: "Médecin Principal",
                      value: selectedPatient.primaryPhysician,
                    },
                    {
                      label: "Consentement au Traitement",
                      value: selectedPatient.treatmentConsent ? "Oui" : "Non",
                    },
                    {
                      label: "Consentement à la Divulgation",
                      value: selectedPatient.disclosureConsent ? "Oui" : "Non",
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                    >
                      <dt className="text-sm font-medium leading-6 text-gray-300">
                        {label}
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="flex justify-between mt-6">
                {/* Bouton Modifier */}
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
                  onClick={handleEditPatient}
                >
                  Modifier
                </button>

                {/* Dialog pour modifier le patient */}
                {selectedPatient && (
                  <PatientModal
                    patient={selectedPatient}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onPatientUpdated={(updatedPatient: Patient) => {
                      setPatients((prev) =>
                        prev.map((patient) =>
                          patient.userId === updatedPatient.userId
                            ? updatedPatient
                            : patient
                        )
                      );
                      setSelectedPatient(updatedPatient);
                    }}
                  />
                )}

                {/* Bouton Supprimer */}
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                  onClick={handleDeletePatient}
                >
                  Supprimer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster richColors closeButton position="top-center" />
    </div>
  );
};

export default PatientDetailsPage;
