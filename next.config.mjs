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
};

export default nextConfig;
