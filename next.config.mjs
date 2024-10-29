/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cloud.appwrite.io"], // Ajoutez le domaine ici
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
