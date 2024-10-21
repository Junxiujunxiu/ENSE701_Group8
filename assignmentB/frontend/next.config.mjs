/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Ignore .test.js/.test.tsx files from the build process
    if (!isServer) {
      config.module.rules.push({
        test: /\.test\.(js|ts|tsx)$/,
        use: 'ignore-loader',
      });
    }
    return config;
  },
};

export default nextConfig;
