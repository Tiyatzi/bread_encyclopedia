import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/bread_encyclopedia" : "",
  assetPrefix: isProd ? "/bread_encyclopedia/" : "",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/bread_encyclopedia" : "",
  },
};

export default nextConfig;
