import { sidetittel } from '@/util/sidetittel';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = { title: sidetittel('Ny etterregistrering') };

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
