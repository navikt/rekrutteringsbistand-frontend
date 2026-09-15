'use client';

import { InviterInternalDto } from './InviterModal';
import { useJobbsøkerValg } from './JobbsøkerValgContext';
import LeggTilJobbsøkerKnapp from './LeggTilJobbsøkerKnapp';
import { erValgbarJobbsøker } from './erValgbarJobbsøker';
import { useJobbsøkerSøkContext } from './filter/JobbsøkerSøkContext';
import { JobbsøkerSøkTreffDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import MarkerAllePåSiden from '@/components/MarkerteKandidater/MarkerAllePåSiden';
import Markeringsrad from '@/components/MarkerteKandidater/Markeringsrad';
import LitenPaginering from '@/components/paginering/LitenPaginering';
import { BodyShort, Button, Select } from '@navikt/ds-react';

interface Props {
  jobbsøkere: JobbsøkerSøkTreffDTO[];
  side: number;
  totalt: number;
  antallSkjulte: number;
  antallSlettede: number;
  treffStatus: RekrutteringstreffStatusType | undefined;
  onÅpneInviter: (jobbsøkere: InviterInternalDto[]) => void;
}

export default function JobbsøkerHandlingsrad({
  jobbsøkere,
  side,
  totalt,
  antallSkjulte,
  antallSlettede,
  treffStatus,
  onÅpneInviter,
}: Props) {
  const { antallPerSide, setAntallPerSide, setSide } = useJobbsøkerSøkContext();
  const { valgteJobbsøkere, markerFlere, fjernAlleValg } = useJobbsøkerValg();

  const fraAntall = totalt === 0 ? 0 : (side - 1) * antallPerSide + 1;
  const tilAntall = totalt === 0 ? 0 : side * antallPerSide;

  const valgbareJobbsøkere = jobbsøkere.filter(erValgbarJobbsøker);
  const valgteSomIkkeErInvitert = valgteJobbsøkere.filter(erValgbarJobbsøker);

  const erPublisert = treffStatus === RekrutteringstreffStatus.PUBLISERT;
  const visInviterKnapper = erPublisert && jobbsøkere.length > 0;

  return (
    <div className='flex flex-wrap items-center justify-between gap-2'>
      <Markeringsrad>
        {erPublisert && (
          <MarkerAllePåSiden
            valgbareIder={valgbareJobbsøkere.map((j) => j.personTreffId)}
            markerteIder={valgteJobbsøkere.map((j) => j.personTreffId)}
            onMarkerAlle={() => markerFlere(valgbareJobbsøkere)}
            onFjernAlle={fjernAlleValg}
          />
        )}
        <LeggTilJobbsøkerKnapp størrelse={'small'} />
        {visInviterKnapper && (
          <Button
            size='small'
            disabled={valgteSomIkkeErInvitert.length === 0}
            onClick={() => onÅpneInviter(valgteSomIkkeErInvitert)}
          >
            Inviter ({valgteSomIkkeErInvitert.length})
          </Button>
        )}
        <div className='flex gap-4 text-sm text-gray-400'>
          <span>
            Skjulte: <strong>{antallSkjulte}</strong>
          </span>
          <span>
            Slettede: <strong>{antallSlettede}</strong>
          </span>
        </div>
      </Markeringsrad>
      <div className='flex items-center gap-1'>
        <BodyShort>Antall per side </BodyShort>
        <Select
          className='mr-4'
          size='small'
          hideLabel
          label='Antall per side'
          value={String(antallPerSide)}
          onChange={(e) => setAntallPerSide(Number(e.target.value))}
        >
          {['25', '50', '75', '100'].map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
        <LitenPaginering
          fraAntall={fraAntall}
          tilAntall={tilAntall}
          total={totalt}
          side={side}
          setSide={setSide}
        />
      </div>
    </div>
  );
}
