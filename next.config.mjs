/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO: For debugging under utvikling
  productionBrowserSourceMaps: true,

  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
  },
  serverExternalPackages: ['@navikt/next-logger'],
};

export default nextConfig;
