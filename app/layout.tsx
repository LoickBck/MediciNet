import type { Metadata } from "next"; // Importation du type `Metadata` pour définir les métadonnées de la page.
import { Plus_Jakarta_Sans } from "next/font/google"; // Importation de la police `Plus Jakarta Sans` depuis Google Fonts.
import { cn } from "@/lib/utils"; // Importation de la fonction utilitaire `cn` pour gérer les classes CSS.
import "./globals.css"; // Importation des styles globaux.
import { ThemeProvider } from "@/components/theme-provider"; // Importation du fournisseur de thème pour gérer les thèmes de l'application.
import CookieConsent from "@/components/CookieConsent"; // Import du composant de consentement

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
  authors: [{ name: "Loick Buck", url: "https://www.buckloick.com" }],
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
    url: "https://medicinet.vercel.app/",
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
const generateThemeColor = (): string => "#131619";

/**
 * Définit la configuration de l'affichage pour les appareils mobiles.
 */
export const generateViewport = () =>
  "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";

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
      <head>
        <meta name="viewport" content={generateViewport()} />
        <meta name="theme-color" content={generateThemeColor()} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="MediciNet" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="icon" href="/assets/favicon.ico" />
        <link rel="shortcut icon" href="/assets/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/images/logo192.png"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
          <CookieConsent /> {/* Ajout du composant de consentement */}
        </ThemeProvider>
      </body>
    </html>
  );
}
