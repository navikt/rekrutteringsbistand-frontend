/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  assetPrefix: process.env.CDN_ASSET_PREFIX,
  crossOrigin: 'anonymous',
  transpilePackages: ['@navikt/navspa'],
  productionBrowserSourceMaps: true,
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
        // Setter security headers for alle routes bortsett fra template routen
        source: '/((?!api/arbeidsgiver-notifikasjon/template).*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
      {
        // Setter security headers for template routen, som godtar x-fram-options
        // slik at forhåndsvisningen av eposten kan vises i en iframe
        source: '/api/arbeidsgiver-notifikasjon/template',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self'; sandbox allow-same-origin",
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
