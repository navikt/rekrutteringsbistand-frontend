/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@navikt/ds-react', '@navikt/ds-css', '@navikt/navspa'],
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
  },
  // Ensure cache directory is available in production
  cacheMaxMemorySize: 0, // Disable in-memory cache if needed
  images: {
    unoptimized: process.env.NODE_ENV === 'production', // Disable image optimization in prod to avoid cache issues
  },
  serverExternalPackages: ['@navikt/next-logger'],
  async redirects() {
    return [
      // Redirect legacy stilling URL for aktivitetskort
      {
        source: '/stillinger/stilling/:uuid',
        destination: '/stilling/:uuid',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
