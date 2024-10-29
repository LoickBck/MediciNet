"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Patient } from "@/types/appwrite.types";
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { toast } from "sonner";
import { updatePatient } from "@/lib/actions/updatePatient";
import { Form } from "@/components/ui/form";
import { FormFieldType } from "@/components/forms/PatientForm";
import { Doctors, IdentificationTypes } from "@/constants";
import Image from "next/image";
import { SelectItem } from "./ui/select";

const patientSchema = z.object({
  name: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(1, "Numéro de téléphone requis"),
  address: z.string().min(1, "Adresse requise"),
  birthDate: z.date(),
  gender: z.enum(["Homme", "Femme", "Autre"]),
  occupation: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactNumber: z.string().optional(),
  primaryPhysician: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  privacyConsent: z.boolean().default(false),
});

type PatientFormProps = z.infer<typeof patientSchema>;

export function PatientModal({
  patient,
  isOpen,
  onClose,
  onPatientUpdated,
}: {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
  onPatientUpdated: (updatedPatient: Patient) => void;
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm<PatientFormProps>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      ...patient,
      birthDate: patient.birthDate ? new Date(patient.birthDate) : undefined,
    },
  });

  const onSubmit = async (data: PatientFormProps) => {
    setLoading(true);
    try {
      const updatedPatient = await updatePatient(patient.$id, data);
      toast.success("Patient mis à jour avec succès.");
      onPatientUpdated(updatedPatient);
      onClose();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du patient.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full h-[80vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-lg mt-4 text-orange-400">
            Modifier les informations du patient
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name"
                label="Nom"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                label="Email"
              />
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Téléphone"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="address"
                label="Adresse"
              />
              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="birthDate"
                label="Date de naissance"
              />
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="gender"
                label="Genre"
              >
                <SelectItem value="Homme">Homme</SelectItem>
                <SelectItem value="Femme">Femme</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </CustomFormField>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="occupation"
                label="Métier"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="emergencyContactName"
                label="Contact d'urgence"
              />
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="emergencyContactNumber"
                label="Numéro d'urgence"
              />
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="primaryPhysician"
                label="Médecin principal"
              >
                {Doctors.map((doctor) => (
                  <SelectItem key={doctor.name} value={doctor.name}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={doctor.image}
                        width={24}
                        height={24}
                        alt={doctor.name}
                        className="rounded-full"
                      />
                      <span>{doctor.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="insuranceProvider"
                label="Assurance"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="insurancePolicyNumber"
                label="Numéro d'assurance"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="allergies"
                label="Allergies"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="currentMedication"
                label="Médicaments actuels"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="familyMedicalHistory"
                label="Historique médical familial"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="pastMedicalHistory"
                label="Historique médical passé"
              />
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="identificationType"
                label="Type d'identification"
              >
                {IdentificationTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </CustomFormField>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="identificationNumber"
                label="Numéro d'identification"
              />
            </div>
            <SubmitButton
              isLoading={loading}
              className="bg-green-500 hover:bg-green-400 w-full mt-4"
            >
              Mettre à jour
            </SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
