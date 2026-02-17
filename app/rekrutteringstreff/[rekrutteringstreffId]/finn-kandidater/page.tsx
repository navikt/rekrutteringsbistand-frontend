'use client';
import FinnKandidaterForRekrutteringstreff from './_ui/FinnKandidaterForRekrutteringstreff';
import VisJobbsøker from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/VisJobbsøker';
import WindowView from '@/components/window/WindowView';

export default function FinnKandidaterForRekrutteringstreffPage() {
  return (
    <WindowView
      param={'visKandidatId'}
      window={(kandidatId) => (
        <VisJobbsøker
          kandidatId={kandidatId}
          leggTilKnapp='rekrutteringstreff'
        />
      )}
    >
      <FinnKandidaterForRekrutteringstreff />;
    </WindowView>
  );
}
