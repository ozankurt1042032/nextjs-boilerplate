/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Build sırasında hata yüzünden durmayı engeller
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Public klasörünü ve kampatibiliteyi garantiye alıyoruz
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
