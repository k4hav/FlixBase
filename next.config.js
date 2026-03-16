/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'image.tmdb.org',
      'res.cloudinary.com',
      'images.unsplash.com',
      'via.placeholder.com',
      'upload.wikimedia.org',
      'i.postimg.cc',
      'm.media-amazon.com',
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
