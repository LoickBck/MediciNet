"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup } from "@radix-ui/react-radio-group"
import { RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions } from "@/constants"
import { Label } from "../ui/label"
import Image from "next/image"
import { SelectItem } from "../ui/select"
 
const RegisterForm = ({user}: { user: User}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  async function onSubmit({name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const userData = {name, email, phone};

      const user = await createUser(userData);

      if (user) router.push(`/patients/${user.id}/register`) 
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
            <h1 className="header">Bienvenue 👋</h1>
            <p className="text-dark-700">Laissez nous en savoir un peu plus sur vous.</p>
        </section>
        <section className="space-y-6">
            <div className="mb-9 space-y-1">

            </div>
            <h2 className="sub-header">Information Personnelle</h2>
        </section>
        
        <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label="Nom complet"
        placeholder="Lionel Messi"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Adresse email"
            placeholder="ballondoràvie@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="user"
            />
            <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Téléphone"
            placeholder="+32 412 34 56 78"
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date de naissance"
            />
            <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Genre"
            renderSkeleton={(field) =>(
                <FormControl>
                    <RadioGroup className="flex h-11 gap-6 xl:justify-between" onValueChange={field.onChange} defaultValue={field.value}>
                        {GenderOptions.map((option)=> (
                        <div key={option}
                        className="radio-group">
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option} className="cursor-pointer">
                                {option}
                            </Label>
                        </div>
                    )
                    )}
                    </RadioGroup>
                </FormControl>
            )}
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Adresse"
            placeholder="Rue de l'Ecuyer 1, 1000 Bruxelles"
            />
            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Travail"
            placeholder="Développeur web"
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Nom du contact d'urgence"
            placeholder="Compagnon,Mère,etc..."
            />
            <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Numéro du contact d'urgence"
            placeholder="+32 412 34 56 78"
            />
        </div>
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
            </div>
            <h2 className="sub-header">Information Médicale</h2>
        </section>
        <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysycian"
            label="Médecin généraliste"
            placeholder="Sélectionner un médecin"
            >
            {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                        <Image
                            src={doctor.image}
                            width={32}
                            height={32}
                            alt={doctor.name}
                            className="rounded-full border border-dark-500"
                        />
                        <p>{doctor.name}</p>
                    </div>
                </SelectItem>
            ))}
        </CustomFormField>
        <div className="flex flex-col gap-6 xl:flex-row">

        </div>

        <SubmitButton isLoading={isLoading}>
          Commencer
        </SubmitButton>
            </form>
        </Form>
  )
}

export default RegisterForm

