import VisJobbsøker from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/VisJobbsøker';
import { usePersonTreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/person/[personTreffId]/PersonTreffContext';
import { Loader } from '@navikt/ds-react';

export default function VisPerson() {
  const personContext = usePersonTreffContext();

  if (personContext.isLoading) {
    return (
      <div className='flex justify-center pt-10'>
        <Loader size='xlarge' title='Laster...' />
      </div>
    );
  }

  return personContext.kandidatnummer ? (
    <VisJobbsøker
      personTreffId={personContext.personTreffId}
      kandidatId={personContext.kandidatnummer}
    />
  ) : (
    <div>Kunne ikke finne kandidatinfo</div>
  );
}
