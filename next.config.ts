import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: 'build',
  output: 'export',
  basePath: '/obunda',
  images: {
    unoptimized: true,
  },

};

export default nextConfig;
