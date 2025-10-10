// Enkel mock av next/navigation for Storybook
// Unngår invariant-feil når komponenter kaller useRouter() utenfor App Router.

export const useRouter = () => ({
  push: (url: string) => {
    // eslint-disable-next-line no-console
    console.info('[storybook mock] router.push ->', url);
  },
  replace: (url: string) => {
    // eslint-disable-next-line no-console
    console.info('[storybook mock] router.replace ->', url);
  },
  refresh: () => {
    // eslint-disable-next-line no-console
    console.info('[storybook mock] router.refresh');
  },
  back: () => {
    // eslint-disable-next-line no-console
    console.info('[storybook mock] router.back');
  },
  forward: () => {
    // eslint-disable-next-line no-console
    console.info('[storybook mock] router.forward');
  },
  prefetch: async () => {},
});

export const usePathname = () => '/storybook';
export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({}) as any;
export const useSelectedLayoutSegment = () => null;
export const useSelectedLayoutSegments = () => [] as string[];
