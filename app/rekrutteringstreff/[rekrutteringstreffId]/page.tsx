'use client';
import Rekrutteringstreff from './_ui/Rekrutteringstreff';
import VisPersonWindow from '@/app/rekrutteringstreff/[rekrutteringstreffId]/person/[personTreffId]/VisPersonWindow';
import WindowView from '@/components/window/WindowView';

export default function RekrutteringstreffPage() {
  return (
    <WindowView
      param='visPersonId'
      window={(personTreffId) => (
        <VisPersonWindow personTreffId={personTreffId} />
      )}
    >
      <Rekrutteringstreff />
    </WindowView>
  );
}
