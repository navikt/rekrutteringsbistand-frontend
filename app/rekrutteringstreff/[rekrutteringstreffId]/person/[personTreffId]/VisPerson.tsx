import VisJobbsøker from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/VisJobbsøker';
import { usePersonTreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/person/[personTreffId]/PersonTreffContext';

export default function VisPerson() {
  const personContext = usePersonTreffContext();

  return personContext.kandidatnummer ? (
    <VisJobbsøker
      personTreffId={personContext.personTreffId}
      kandidatId={personContext.kandidatnummer}
    />
  ) : (
    <div>Kunne ikke finne kandidatinfo</div>
  );
}
