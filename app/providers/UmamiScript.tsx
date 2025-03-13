'use client';

import Script from 'next/script';

export default function UmamiAnalytics() {
  console.log('KAKE');
  console.log(
    '🎺 process.env.NAIS_CLUSTER_NAME',
    process.env.NAIS_CLUSTER_NAME,
  );
  console.log('umami_src', process.env.NEXT_PUBLIC_UMAMI_SRC);
  console.log('umami_url', process.env.NEXT_PUBLIC_UMAMI_URL);
  console.log('umami_id', process.env.NEXT_PUBLIC_UMAMI_ID);

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
