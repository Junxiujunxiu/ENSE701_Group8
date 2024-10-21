/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude test files from being processed by Webpack
      config.module.rules.push({
        test: /\.test\.(js|ts|tsx)$/,
        loader: 'null-loader', // Use 'null-loader' instead of 'ignore-loader'
      });
    }
    return config;
  },
};

export default nextConfig;
