'use client';
import Rekrutteringstreff from './_ui/Rekrutteringstreff';
import VisPersonWindow from '@/app/rekrutteringstreff/[rekrutteringstreffId]/person/[personTreffId]/VisPersonWindow';
import WindowView from '@/components/window/WindowView';
import { usePathname } from 'next/navigation';

export default function RekrutteringstreffPage() {
  const pathname = usePathname();
  return (
    <WindowView
      param='visPersonId'
      fullskjermUrl={(id) => `${pathname}/person/${id}`}
      window={(personTreffId) => (
        <VisPersonWindow personTreffId={personTreffId} />
      )}
    >
      <Rekrutteringstreff />
    </WindowView>
  );
}
