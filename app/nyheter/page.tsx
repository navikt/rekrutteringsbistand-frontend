import Nyheter from './Nyheter';
import { sidetittel } from '@/util/sidetittel';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: sidetittel('Nyheter') };

export default function NyheterPage() {
  return <Nyheter />;
}
