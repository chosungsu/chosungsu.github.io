const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/chosungsu.github.io',
  assetPrefix: '/chosungsu.github.io/',
  trailingSlash: true,
};

module.exports = withMDX(nextConfig); 