import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/calculators/ibw-bsa",
        destination: "/calculators/bsa",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
