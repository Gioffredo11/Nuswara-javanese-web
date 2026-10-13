import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/character-relationships',
        destination: '/family-tree',
        permanent: true,
      },
      {
        source: '/manifestasi',
        destination: '/manifestation',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
