/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreDuringBuilds: true,
  },
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/random",
      },
      {
        protocol: "https",
        hostname: "www.wpbeginner.com",
        port: "",
        pathname: "/wp-content/uploads/2017/08/fallbackthumbnail.png",
      },
    ],
  },
};

module.exports = nextConfig;
