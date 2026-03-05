import VisJobbsøker from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/VisJobbsøker';
import { usePersonTreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/person/[personTreffId]/PersonTreffContext';
import Sidelaster from '@/components/layout/Sidelaster';

export default function VisPerson() {
  const personContext = usePersonTreffContext();

  if (personContext.isLoading) {
    return <Sidelaster />;
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
