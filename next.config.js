const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/chosungsu.github.io' : '',
  assetPrefix: '',
};

module.exports = withMDX(nextConfig); 