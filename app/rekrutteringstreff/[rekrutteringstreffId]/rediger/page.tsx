'use client';

import RekrutteringstreffRediger from './_ui/RekrutteringstreffRediger';
import VisPersonWindow from '@/app/rekrutteringstreff/[rekrutteringstreffId]/person/[personTreffId]/VisPersonWindow';
import WindowView from '@/components/window/WindowView';
import { usePathname } from 'next/navigation';

export default function RedigerRekrutteringstreffPage() {
  const pathname = usePathname();
  return (
    <WindowView
      param='visPersonId'
      fullskjermUrl={(id) =>
        `${pathname.replace(/\/rediger$/, '')}/person/${id}`
      }
      window={(personTreffId) => (
        <VisPersonWindow personTreffId={personTreffId} />
      )}
    >
      <RekrutteringstreffRediger />
    </WindowView>
  );
}
