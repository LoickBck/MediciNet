"use client";

import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import { Doctors } from "@/constants";
import AppointmentModal from "../AppointmentModal";
import { Appointment } from "@/types/appwrite.types";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
      <p className="text-14-medium">
        {row.original.patient?.name || "Nom non disponible"}
      </p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Date et heure",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: () => "Docteur",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician
      );
      return (
        <div className="flex items-center gap-3">
          <Image
            //@ts-expect-error: Erreur Typescript mais pas d'erreur
            src={doctor?.image}
            //@ts-expect-error: Erreur Typescript mais pas d'erreur
            alt={doctor.name}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          {data.patient ? (
            <AppointmentModal
              type="programmer"
              patientId={data.patient.$id}
              userId={data.userId}
              appointment={data}
            />
          ) : (
            <span className="ml-4">Indisponible</span>
          )}

          {data.patient ? (
            <AppointmentModal
              type="annuler"
              patientId={data.patient?.$id} // Utilisation de l'opérateur de chaînage optionnel
              userId={data.userId}
              appointment={data}
            />
          ) : (
            <span className="ml-4">Indisponible</span> // Message d'info pour les patients supprimés
          )}
        </div>
      );
    },
  },
];
