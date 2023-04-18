/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['bcrypt'],
  },
}

module.exports = nextConfig


// module.exports = {
//   experimental: {
//     appDir: true,
//   },
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'http://localhost:8080/:path*', // Replace '8080' with the port your server is running on
//       },
//     ];
//   },
// };

