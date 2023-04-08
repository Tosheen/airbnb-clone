/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["avatars.githubuserscontent.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
