import RedigerStillingUtvikler from './RedigerStillingUtvikler';
import { sidetittel } from '@/util/sidetittel';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: sidetittel('Utvikler') };

export default function RedigerStillingDevPage() {
  return <RedigerStillingUtvikler />;
}
