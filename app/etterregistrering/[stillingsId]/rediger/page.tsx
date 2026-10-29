import StillingAdmin from '@/app/stilling/_ui/stilling-admin/page';
import { sidetittel } from '@/util/sidetittel';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: sidetittel('Rediger etterregistrering'),
};

export default function RedigerEtterregistrering() {
  return <StillingAdmin />;
}
