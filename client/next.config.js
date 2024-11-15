/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.watchOptions.poll = 10000;
    return config;
  },
};

module.exports = nextConfig;
