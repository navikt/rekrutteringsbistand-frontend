// Enkel mock av next/navigation for Storybook
// Utvidet slik at search params faktisk oppdateres ved push/replace, slik at hooks som nuqs fungerer.
import { useEffect, useState } from 'react';

const notify = () => {
  // Bruk popstate for å signalisere endring
  window.dispatchEvent(new Event('popstate'));
};

export const useRouter = () => ({
  push: (url: string) => {
    const newUrl = new URL(url, window.location.href);
    window.history.pushState(null, '', newUrl.toString());
    notify();
    // eslint-disable-next-line no-console
    console.info('[storybook mock] router.push ->', newUrl.toString());
  },
  replace: (url: string) => {
    const newUrl = new URL(url, window.location.href);
    window.history.replaceState(null, '', newUrl.toString());
    notify();
    // eslint-disable-next-line no-console
    console.info('[storybook mock] router.replace ->', newUrl.toString());
  },
  refresh: () => {
    // eslint-disable-next-line no-console
    console.info('[storybook mock] router.refresh');
  },
  back: () => window.history.back(),
  forward: () => window.history.forward(),
  prefetch: async () => {},
});

export const usePathname = () => '/storybook';

export const useSearchParams = () => {
  const [params, setParams] = useState(
    () => new URLSearchParams(window.location.search),
  );
  useEffect(() => {
    const handler = () =>
      setParams(new URLSearchParams(window.location.search));
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);
  return params;
};

export const useParams = () => ({}) as any;
export const useSelectedLayoutSegment = () => null;
export const useSelectedLayoutSegments = () => [] as string[];
