import RedigerTilgang from './_ui/RedigerTilgang';
import { sidetittel } from '@/util/sidetittel';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = { title: sidetittel('Rediger treff') };

export default function Layout({ children }: { children: ReactNode }) {
  return <RedigerTilgang>{children}</RedigerTilgang>;
}
