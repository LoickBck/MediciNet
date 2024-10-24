import type { Metadata } from "next"; // Importation du type `Metadata` pour définir les métadonnées de la page.
import { Plus_Jakarta_Sans } from "next/font/google"; // Importation de la police `Plus Jakarta Sans` depuis Google Fonts.
import { cn } from "@/lib/utils"; // Importation de la fonction utilitaire `cn` pour gérer les classes CSS.
import "./globals.css"; // Importation des styles globaux.
import { ThemeProvider } from "@/components/theme-provider"; // Importation du fournisseur de thème pour gérer les thèmes de l'application.

/**
 * Configuration de la police `Plus Jakarta Sans` :
 * - Définie pour inclure les sous-ensembles latins.
 * - Utilisation de différentes graisses (300 à 700) pour varier les styles de texte.
 * - Stockée dans la variable CSS `--font-sans` pour un usage global.
 */
const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * Définition des métadonnées de la page racine :
 * - `title`: Titre de l'application.
 * - `description`: Brève description de l'application pour les moteurs de recherche et les navigateurs.
 * - `keywords`: Liste de mots-clés pour aider au référencement (SEO).
 * - `author`: Auteur ou propriétaire du site.
 * - `og` et `twitter`: Métadonnées Open Graph et Twitter Card pour améliorer l'apparence lors du partage sur les réseaux sociaux.
 */
export const metadata: Metadata = {
  title: "MediciNet - Système de gestion des soins de santé",
  description:
    "MediciNet est une application de gestion complète des soins de santé, facilitant la gestion des rendez-vous, des dossiers patients et plus encore.",
  keywords: [
    "santé",
    "gestion des soins",
    "rendez-vous",
    "médecin",
    "patients",
    "gestion de la santé",
  ],
  authors: [
    { name: "MediciNet Team", url: "https://www.buckloick.medicinet.com" },
  ],
  icons: {
    icon: "/assets/favicon.ico",
    shortcut: "/assets/favicon.ico",
    apple: "/assets/icons/logo-icon.svg",
  },
  manifest: "/manifest.json", // Pour définir les informations de PWA si l'application est progressive.
  openGraph: {
    title: "MediciNet - Système de gestion des soins de santé",
    description:
      "Simplifiez la gestion des soins de santé avec MediciNet, votre plateforme de gestion des patients et des rendez-vous.",
    url: "https://www.buckloick.medicinet.com",
    siteName: "MediciNet",
    images: [
      {
        url: "/assets/images/logo.png",
        width: 1200,
        height: 630,
        alt: "MediciNet - Simplifiez la gestion des soins de santé",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@MediciNetApp",
    creator: "@azd_l14",
    title: "MediciNet - Système de gestion des soins de santé",
    description:
      "Découvrez une nouvelle façon de gérer vos soins de santé avec MediciNet.",
    images: ["/assets/images/logo.png"],
  },
};

/**
 * Définit la couleur du thème pour le navigateur mobile.
 */
export const generateThemeColor = () => "#24AE7C";

/**
 * Définit la configuration de l'affichage pour les appareils mobiles.
 */
export const generateViewport = () =>
  "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";

/**
 * Composant `RootLayout` pour définir la mise en page de base de l'application.
 * Ce composant enveloppe toutes les autres pages, fournissant un contexte commun, y compris le thème et les styles globaux.
 * @param children - Contient les composants enfants à afficher dans cette mise en page.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      {/* Définit la langue de la page comme étant le français */}
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased",
          fontSans.variable
        )} // Applique des classes CSS de base au corps de la page.
      >
        {/* Fournisseur de thème pour gérer le thème sombre par défaut */}
        <ThemeProvider
          attribute="class" // Gère les classes CSS en fonction du thème actif.
          defaultTheme="dark" // Définit le thème sombre comme thème par défaut.
        >
          {children} {/* Affiche les composants enfants */}
        </ThemeProvider>
      </body>
    </html>
  );
}
