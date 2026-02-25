import RekrutteringstreffForm from '../_ui/rediger/RekrutteringstreffForm';
import { ReactNode } from 'react';

export default function RedigerLayout({ children }: { children: ReactNode }) {
  return <RekrutteringstreffForm>{children}</RekrutteringstreffForm>;
}
