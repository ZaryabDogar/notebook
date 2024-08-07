// next.config.js
module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://note-be-two.vercel.app/api/:path*', // Proxy to backend
        },
      ]
    },
  }
  