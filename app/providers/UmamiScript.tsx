'use client';

import Script from 'next/script';

export default function UmamiAnalytics() {
  return (
    <Script
      defer
      id='umami-analytics'
      strategy='afterInteractive'
      src={process.env.NEXT_PUBLIC_UMAMI_SRC}
      data-host-url={process.env.NEXT_PUBLIC_UMAMI_URL}
      data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
    />
  );
}
