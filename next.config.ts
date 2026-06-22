import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* React Three Fiber and related packages need transpilation */
  transpilePackages: ['three'],
};

export default nextConfig;
