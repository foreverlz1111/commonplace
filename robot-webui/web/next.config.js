module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*', // 代理到后端服务器
      },
    ];
  },
};

// module.exports = {
  // output:"export",
  // distDir: 'build',
// }
