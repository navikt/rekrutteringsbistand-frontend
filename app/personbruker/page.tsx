import InngangFraArbop from './InngangFraArbop';
import { sidetittel } from '@/util/sidetittel';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: sidetittel('Jobbsøker') };

export default function PersonbrukerSide() {
  return <InngangFraArbop />;
}
