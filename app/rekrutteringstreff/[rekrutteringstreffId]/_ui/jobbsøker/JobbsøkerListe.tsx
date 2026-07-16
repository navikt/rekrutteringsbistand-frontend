'use client';

import JobbsøkerKort from './JobbsøkerKort';
import JobbsøkerSortHeader from './JobbsøkerSortHeader';
import { useJobbsøkerValg } from './JobbsøkerValgContext';
import { JobbsøkerSøkTreffDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import SideScroll from '@/components/SideScroll';

interface Props {
  jobbsøkere: JobbsøkerSøkTreffDTO[];
  rekrutteringstreffId: string;
  treffStatus: RekrutteringstreffStatusType;
  onMutate: () => void;
}

export default function JobbsøkerListe({
  jobbsøkere,
  rekrutteringstreffId,
  treffStatus,
  onMutate,
}: Props) {
  const { erValgt, toggleValgt } = useJobbsøkerValg();

  return (
    <SideScroll
      lagreScrollNøkkel={`jobbsøkere-${rekrutteringstreffId}-${jobbsøkere.length}`}
    >
      <div>
        <JobbsøkerSortHeader />
        <ul>
          {jobbsøkere.map((jobbsøker) => (
            <li key={jobbsøker.personTreffId}>
              <JobbsøkerKort
                fornavn={jobbsøker.fornavn ?? ''}
                etternavn={jobbsøker.etternavn ?? ''}
                personTreffId={jobbsøker.personTreffId}
                fødselsnummer={jobbsøker.fødselsnummer}
                status={jobbsøker.status}
                minsideHendelser={jobbsøker.minsideHendelser}
                lagtTilDato={jobbsøker.lagtTilDato}
                lagtTilAv={jobbsøker.lagtTilAv}
                lagtTilAvNavn={jobbsøker.lagtTilAvNavn}
                alder={jobbsøker.alder}
                erValgt={erValgt(jobbsøker.personTreffId)}
                onCheckboxChange={(valgt) => toggleValgt(jobbsøker, valgt)}
                erDeaktivert={false}
                onMutate={onMutate}
                rekrutteringstreffId={rekrutteringstreffId}
                rekrutteringstreffStatus={treffStatus}
              />
            </li>
          ))}
        </ul>
      </div>
    </SideScroll>
  );
}
