import PatientForm from "@/components/forms/PatientForm";
import PasswordModal from "@/components/PasswordModal";
import Image from "next/image";
import Link from "next/link";

export default function RendezVous({searchParams}: SearchParamProps) {
  const isAdmin = searchParams.admin === 'true';

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasswordModal />}

      <section className="remove-scrollbar container mx-auto">
        <div className="sub-container max-w-[496px]">
            <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          >
          </Image>
            </Link>
          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 MediciNet
            </p>
            <Link href="/rendez-vous/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image 
      src="/assets/images/onboarding-img.jpg"
      height={1000}
      width={1000}
      alt="patient"
      className="side-img max-w-[50%]"
      />
    </div>
  );
}
