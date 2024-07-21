/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dpeycb3s4/**',
      },
    ],
  },
};

export default nextConfig;
