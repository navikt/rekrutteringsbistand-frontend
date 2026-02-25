'use client';

import RekrutteringstreffRediger from '../_ui/RekrutteringstreffRediger';
import VisPersonWindow from '@/app/rekrutteringstreff/[rekrutteringstreffId]/person/[personTreffId]/VisPersonWindow';
import WindowView from '@/components/window/WindowView';

export default function RedigerRekrutteringstreffPage() {
  return (
    <WindowView
      param='visPersonId'
      window={(personTreffId) => (
        <VisPersonWindow personTreffId={personTreffId} />
      )}
    >
      <RekrutteringstreffRediger />
    </WindowView>
  );
}
