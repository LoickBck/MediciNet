"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation"; // Importer le hook usePathname

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const pathname = usePathname(); // Récupérer le chemin actuel

  useEffect(() => {
    // Vérifier si le cookie de consentement existe
    const consent = Cookies.get("user-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  useEffect(() => {
    // Fermer la bannière si l'utilisateur est sur la page de politique de confidentialité
    if (pathname === "/privacy-policy") {
      setShowBanner(false);
    }
  }, [pathname]); // Recalculer si le chemin change

  const handleAccept = () => {
    // Créer un cookie pour stocker le consentement de l'utilisateur
    Cookies.set("user-consent", "accepted", { expires: 365 });
    setShowBanner(false);
  };

  const handleReject = () => {
    // Créer un cookie pour indiquer le rejet du consentement
    Cookies.set("user-consent", "rejected", { expires: 365 });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="z-40 fixed bottom-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        En continuant, vous acceptez notre politique de confidentialité.{" "}
        <a href="/privacy-policy" className="underline">
          En savoir plus
        </a>
      </div>
      <div>
        <button
          onClick={handleAccept}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Accepter
        </button>
        <button
          onClick={handleReject}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Refuser
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
