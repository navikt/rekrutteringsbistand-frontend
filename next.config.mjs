/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@navikt/ds-react', '@navikt/ds-css', '@navikt/navspa'],
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
  },
  cacheMaxMemorySize: 0,
  images: {
    unoptimized: process.env.NODE_ENV === 'production',
  },
  generateEtags: false,
  serverExternalPackages:
    process.env.NODE_ENV === 'production'
      ? ['@navikt/next-logger']
      : ['@navikt/next-logger', 'msw'],
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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000 ; includeSubDomains',
          },
          // Ensure cookies work properly with Wonderwall
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, max-age=0, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
