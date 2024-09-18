import type { Metadata } from "next";
import { Plus_Jakarta_Sans} from "next/font/google";
import {cn} from '@/lib/utils';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ['300', '400', '500', '600', '700'],
});


export const metadata: Metadata = {
  title: "MediciNet",
  description: "Système de gestion des soins de santé",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={cn('min-h-screen bg-dark-300 font-sans antialiased', fontSans.variable)}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
