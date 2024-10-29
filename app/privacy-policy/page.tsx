"use client";

import Link from "next/link";
import Image from "next/image";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-300 p-6">
      <Link href="/">
        <Image
          src="/assets/icons/logo-full.svg"
          height={1000}
          width={1000}
          alt="patient"
          className="mb-12 h-10 sm:h-12 md:h-14 lg:h-14 w-fit"
        />
      </Link>
      <div className="bg-white rounded-lg p-8 shadow-md max-w-3xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-600">
          Consentement à la Collecte et au Traitement des Données Personnelles
        </h1>
        <p className="text-gray-700 mb-4">
          En utilisant notre plateforme MediciNet, vous acceptez les termes
          suivants concernant la collecte et le traitement de vos données
          personnelles conformément aux réglementations européennes (RGPD) et
          belges. Merci de lire attentivement les informations ci-dessous :
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2 text-dark-500">
          1. Collecte des Données Personnelles
        </h2>
        <p className="text-gray-700 mb-4">
          Nous recueillons certaines informations personnelles afin de vous
          fournir nos services de gestion des soins de santé, tels que :
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Nom complet</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>
              Informations médicales (antécédents médicaux, traitements en
              cours, allergies, etc.)
            </li>
            <li>Documents d&apos;identification</li>
          </ul>
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2 text-dark-500">
          2. Utilisation des Données
        </h2>
        <p className="text-gray-700 mb-4">
          Vos données personnelles sont utilisées uniquement dans le but de :
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Planifier et gérer vos rendez-vous médicaux.</li>
            <li>Maintenir vos dossiers médicaux en sécurité.</li>
            <li>Améliorer nos services de soins de santé.</li>
          </ul>
        </p>
        <p className="text-gray-700 mb-4">
          Nous ne vendons ni ne divulguons vos informations personnelles à des
          tiers sans votre consentement préalable, sauf dans les cas où cela est
          requis par la loi.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2 text-dark-500">
          3. Bases Légales du Traitement des Données
        </h2>
        <p className="text-gray-700 mb-4">
          Conformément au RGPD, le traitement de vos données personnelles est
          basé sur les principes suivants :
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Votre consentement éclairé et explicite.</li>
            <li>
              La nécessité de fournir les services demandés (gestion des
              rendez-vous).
            </li>
            <li>Le respect de nos obligations légales et réglementaires.</li>
          </ul>
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2 text-dark-500">
          4. Partage des Données avec des Services Tiers
        </h2>
        <p className="text-gray-700 mb-4">
          Nous utilisons des services tiers comme Twilio pour vous envoyer des
          rappels et notifications par SMS concernant vos rendez-vous médicaux.
          Par conséquent, votre numéro de téléphone peut être stocké dans les
          bases de données de Twilio. Nous veillons à ce que tous nos
          fournisseurs tiers respectent les normes de sécurité et de
          confidentialité les plus strictes pour protéger vos informations.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2 text-dark-500">
          5. Sécurité des Données
        </h2>
        <p className="text-gray-700 mb-4">
          Nous prenons des mesures appropriées pour protéger vos données contre
          tout accès non autorisé, altération ou divulgation. Nous utilisons des
          technologies de sécurité modernes pour assurer la confidentialité et
          l&apos;intégrité de vos informations.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2 text-dark-500">
          6. Conservation des Données
        </h2>
        <p className="text-gray-700 mb-4">
          Vos données personnelles sont conservées uniquement pendant la période
          nécessaire à la réalisation des finalités pour lesquelles elles ont
          été collectées, ou pour respecter nos obligations légales et
          contractuelles.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2 text-dark-500">
          7. Droits des Utilisateurs
        </h2>
        <p className="text-gray-700 mb-4">
          En vertu du RGPD, vous avez les droits suivants concernant vos données
          personnelles :
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>
              Droit d&apos;accès : Vous pouvez demander à consulter vos données.
            </li>
            <li>
              Droit de rectification : Vous pouvez corriger vos informations.
            </li>
            <li>
              Droit à l&apos;oubli : Vous pouvez demander la suppression de vos
              données.
            </li>
            <li>
              Droit à la portabilité : Vous pouvez demander la transmission de
              vos données à un autre fournisseur.
            </li>
            <li>
              Droit d&apos;opposition : Vous pouvez vous opposer à certains
              types de traitement.
            </li>
            <li>
              Droit à la limitation du traitement : Vous pouvez demander la
              suspension du traitement de vos données.
            </li>
          </ul>
          Pour exercer ces droits, vous pouvez nous contacter directement via
          notre mail.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2 text-dark-500">
          8. Acceptation du Consentement
        </h2>
        <p className="text-gray-700 mb-4">
          En cliquant sur "Accepter", vous consentez expressément à la collecte,
          au traitement et au partage de vos données personnelles conformément
          aux termes de cette politique de confidentialité.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2 text-dark-500">
          9. Contact et Réclamations
        </h2>
        <p className="text-gray-700 mb-4">
          Si vous avez des questions, des préoccupations ou si vous souhaitez
          déposer une réclamation concernant l&apos;utilisation de vos données
          personnelles, vous pouvez nous contacter à l&apos;adresse suivante :{" "}
          <a
            href="mailto:loickbuck@hotmail.com"
            className="text-blue-500 hover:underline"
          >
            loickbuck@hotmail.com
          </a>
          . Vous avez également le droit de déposer une réclamation auprès de
          l&apos;Autorité de Protection des Données (APD) en Belgique.
        </p>

        <div className="flex justify-center mt-6">
          <Link href="/">
            <button
              onClick={() => alert("Merci pour votre consentement !")}
              className="bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Accepter
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
