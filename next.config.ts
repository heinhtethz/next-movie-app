const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};
