import { type ClassValue, clsx } from "clsx"; // Importation du type ClassValue et de la fonction clsx de la bibliothèque clsx pour combiner des classes CSS.
import { twMerge } from "tailwind-merge"; // Importation de la fonction twMerge pour fusionner des classes Tailwind CSS en supprimant les doublons.

/**
 * Fonction utilitaire pour combiner et fusionner des classes CSS.
 * @param inputs - Liste de classes CSS.
 * @returns Les classes fusionnées sans doublons.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Fonction pour sérialiser et désérialiser un objet.
 * @param value - L'objet à transformer.
 * @returns L'objet transformé en supprimant toute référence circulaire.
 */
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

/**
 * Convertit un fichier en URL utilisable par le navigateur.
 * @param file - Le fichier à convertir.
 * @returns Une URL temporaire pour accéder au fichier.
 */
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

/**
 * Fonction pour formater une date et heure en fonction de plusieurs formats.
 * @param dateString - La date (sous forme de chaîne ou d'objet Date) à formater.
 * @returns Un objet contenant différentes versions formatées de la date.
 */
export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // Nom abrégé du jour de la semaine (ex. 'Lun')
    month: "short", // Nom abrégé du mois (ex. 'Oct')
    day: "numeric", // Jour numérique du mois (ex. '25')
    year: "numeric", // Année numérique (ex. '2023')
    hour: "numeric", // Heure numérique (ex. '8')
    minute: "numeric", // Minute numérique (ex. '30')
    hour12: false, // Utilisation de l'horloge 12 heures (true) ou 24 heures (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // Nom abrégé du jour de la semaine (ex. 'Lun')
    year: "numeric", // Année numérique (ex. '2023')
    month: "2-digit", // Mois sous forme de nombre à deux chiffres (ex. '10')
    day: "2-digit", // Jour numérique du mois (ex. '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // Nom abrégé du mois (ex. 'Oct')
    year: "numeric", // Année numérique (ex. '2023')
    day: "numeric", // Jour numérique du mois (ex. '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // Heure numérique (ex. '8')
    minute: "numeric", // Minute numérique (ex. '30')
    hour12: true, // Utilisation de l'horloge 12 heures (true) ou 24 heures (false)
  };

  // Formate la date en fonction des différentes options définies.
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "fr-FR",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "fr-FR",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "fr-FR",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "fr-FR",
    timeOptions
  );

  return {
    dateTime: formattedDateTime, // Date et heure combinées.
    dateDay: formattedDateDay, // Date avec le jour de la semaine.
    dateOnly: formattedDate, // Date sans l'heure.
    timeOnly: formattedTime, // Heure seule.
  };
};

/**
 * Fonction pour chiffrer une chaîne en utilisant la fonction `btoa`.
 * @param password - La chaîne à chiffrer.
 * @returns La chaîne chiffrée en base64.
 */
export function encryptKey(password: string) {
  return btoa(password);
}

/**
 * Fonction pour déchiffrer une chaîne chiffrée avec `btoa`.
 * @param password - La chaîne chiffrée.
 * @returns La chaîne d'origine après déchiffrement.
 */
export function decryptKey(password: string) {
  return atob(password);
}
