import "dotenv/config";

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  images: {
    domains: ["cloud.appwrite.io"], // Ajoutez le domaine ici
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  output: "server", // Utilisation de l'option serveur pour autoriser SSR et CSR
};

export default nextConfig;
