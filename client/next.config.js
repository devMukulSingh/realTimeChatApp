/** @type {import('next').NextConfig} */

const nextConfig = {
    env:{
      NEXT_PUBLIC_ZEGO_APP_ID:999933661,
      NEXT_PUBLIC_ZEGO_SERVER_ID:'d2e9d77703dee4f36de373db41bf1d5d'
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
        },
        {
          hostname:'res.cloudinary.com',
          protocol:'https',
      },
      {
        protocol:'http',
        hostname:'localhost'
      }
      ],
    },
  }
module.exports = nextConfig