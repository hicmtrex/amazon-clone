/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'links.papareact.com', 'fakestoreapi.com'],
  },
};

module.exports = nextConfig;
