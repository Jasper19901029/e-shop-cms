/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/test-back-b4f7e.appspot.com/**",
      },
    ],
  },
};

module.exports = nextConfig;
