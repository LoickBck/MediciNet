"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Faq from "@/components/Faq";

export default function Home() {
  const gifs = [
    "/assets/gifs/medecin1.gif",
    "/assets/gifs/medecin2.gif",
    "/assets/gifs/medecin3.gif",
  ];

  const [currentGif, setCurrentGif] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true); // Démarrer l'animation de disparition
      setTimeout(() => {
        setCurrentGif((prevGif) => (prevGif + 1) % gifs.length);
        setFadeOut(false); // Réinitialiser l'animation après le changement
      }, 1500); // La durée de l'animation de disparition (1,5 seconde)
    }, 15000); // Changer de GIF toutes les 15 secondes

    return () => clearInterval(interval);
  }, [gifs.length]);

  return (
    <div>
      <div className="flex min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 max-w-screen-xl px-4 pt-20 pb-8 mx-auto gap-8 lg:py-8 lg:pt-6">
          {/* Texte : Colonne 1/12 en grand écran */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="logo Medicinet"
              className="mb-12 h-auto max-w-[60%] sm:max-w-[35%] md:max-w-[35%] lg:max-w-[30%]"
            />
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-white">
              Découvrez <br /> une nouvelle façon de prendre vos{" "}
              <span className="text-green-500">rendez-vous</span>.
            </h1>
            <p className="max-w-2xl mb-6 font-light text-dark-700 lg:mb-8 md:text-lg lg:text-xl">
              Simplifiez-vous la vie, utilisez MediciNet pour prendre un
              rendez-vous médical en quelques clics.
            </p>
          </div>
          {/* Image : Colonne 5/12 en grand écran, en dessous en mobile */}
          <div className="lg:col-span-5 flex justify-center items-center overflow-hidden">
            <div
              className={`transition-opacity duration-1000 ${
                fadeOut ? "opacity-0" : "opacity-100"
              }`}
            >
              <Image
                src={gifs[currentGif]}
                unoptimized
                alt="hero image"
                width={450}
                height={450}
                className="object-cover w-full max-h-[300px] sm:max-h-[350px] md:max-h-[375px] lg:max-h-[450px]"
              />
            </div>
          </div>
          <div className="lg:col-span-12 flex justify-center">
            <Button
              variant="default"
              size="lg"
              className="shad-primary-btn flex items-center px-8 py-3 text-lg font-semibold text-white"
            >
              <Link
                href="/rendez-vous"
                className="w-full h-full flex justify-center items-center"
              >
                Prendre un Rendez-vous
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center mt-32">
        <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
          <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-indigo-400">
            <Image
              src="/assets/icons/user.svg"
              width={30}
              height={30}
              alt="homeicon"
            />
          </div>
          <h3 className="text-3xl mb-2 font-semibold leading-normal">
            Heureux de travailler avec vous
          </h3>
          <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-dark-700">
            Vous n&apos;avez pas envie de rester en attente durant de longues
            minutes pour prendre rendez-vous ?
          </p>
          <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-dark-700">
            MediciNet réponds à votre attente en simplifiant la prise de
            rendez-vous médical.
          </p>
        </div>

        <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-indigo-400">
            <Image
              alt="..."
              src="/assets/images/home-img.jpg"
              width={1980}
              height={1270}
              className="w-full align-middle rounded-t-lg"
            />
            <blockquote className="relative p-8 mb-4">
              <svg
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 583 95"
                className="absolute left-0 w-full block"
                style={{
                  height: "95px",
                  top: "-94px",
                }}
              >
                <polygon
                  points="-30,95 583,95 583,65"
                  className="text-indigo-400 fill-current"
                ></polygon>
              </svg>
              <h4 className="text-xl font-bold text-white">
                Nos médecins peuvent vous aider!
              </h4>
              <p className="text-md font-light mt-2 text-white">
                Notre sélection de différents médecins saura combler vos
                attentes et vos besoins, n&apos;hésitez pas à prendre
                rendez-vous! Même si c&apos;est juste un check-up 🩺😉
              </p>
            </blockquote>
          </div>
        </div>
      </div>
      <Faq />
      <p className="copyright py-12 xl:ml-10">© 2024 MediciNet</p>
    </div>
  );
}
