/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        esmExternals: "loose", // <-- add this
        serverComponentsExternalPackages: ["mongoose"] // <-- and this
      },
      // and the following to enable top-level await support for Webpack
      webpack: (config) => {
        config.experiments = {
          ...config.experiments,
          topLevelAwait: true,
          layers: true,
        };
        return config;
      },
      env: {
        ORDER_URL: process.env.ORDER_URL, 
        PAYMENT_URL: process.env.PAYMENT_URL,
      },
};

export default nextConfig;
