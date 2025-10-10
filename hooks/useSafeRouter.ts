// Gjenbrukbar hook som skjuler App Router invariant-feilen i miljøer uten Next App Router (f.eks. Storybook)
import { useRouter } from 'next/navigation';

export type SafeRouter = ReturnType<typeof useRouter> | null;

export const useSafeRouter = (): SafeRouter => {
  try {
    return useRouter();
  } catch {
    return null;
  }
};
