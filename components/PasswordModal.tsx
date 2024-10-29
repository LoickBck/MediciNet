"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { decryptKey, encryptKey } from "@/lib/utils";

const EXPIRATION_TIME = 60 * 60 * 1000; // 1 heure en millisecondes

const PasswordModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const path = usePathname();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessPass")
      : null;
  const expirationTime =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessPassExpiration")
      : null;

  useEffect(() => {
    const accessPass = encryptedKey && decryptKey(encryptedKey);
    const now = Date.now();

    if (
      accessPass === process.env.NEXT_PUBLIC_ADMIN_PASSWORD &&
      expirationTime &&
      now < Number(expirationTime)
    ) {
      setOpen(false);
      router.push("/admin");
    } else {
      // Si expiré ou non valide, ouvrir la modal et nettoyer localStorage
      localStorage.removeItem("accessPass");
      localStorage.removeItem("accessPassExpiration");
      setOpen(true);
    }
  }, [encryptedKey, expirationTime]);

  const validatePassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      const encryptedKey = encryptKey(password);
      const expirationDate = Date.now() + EXPIRATION_TIME;

      // Sauvegarde de la clé encryptée et de l'expiration
      localStorage.setItem("accessPass", encryptedKey);
      localStorage.setItem("accessPassExpiration", expirationDate.toString());

      setOpen(false);
      router.push("/admin");
    } else {
      setError("Mot de passe invalide. Veuillez réessayer.");
    }
  };

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Vérification pour accéder à l'Administration
            <Image
              src="/assets/icons/close.svg"
              alt="fermer"
              width={20}
              height={20}
              onClick={() => closeModal()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            Pour accéder à la page d'administration, entrez le code de
            vérification.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={password}
            onChange={(value) => setPassword(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePassword(e)}
            className="shad-primary-btn w-full"
          >
            Valider
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasswordModal;
