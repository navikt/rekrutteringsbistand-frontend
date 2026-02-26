import RekrutteringstreffForm from './_ui/RekrutteringstreffForm';
import { ReactNode } from 'react';

export default function RedigerLayout({ children }: { children: ReactNode }) {
  return <RekrutteringstreffForm>{children}</RekrutteringstreffForm>;
}
