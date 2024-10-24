"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Vérifier si le cookie de consentement existe
    const consent = Cookies.get("user-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

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
    <div className="fixed bottom-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        Nous utilisons des cookies pour améliorer votre expérience. En
        continuant, vous acceptez notre utilisation des cookies et notre
        politique de confidentialité.{" "}
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
