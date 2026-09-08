'use client';

import { InviterInternalDto } from './InviterModal';
import { useJobbsøkerValg } from './JobbsøkerValgContext';
import LeggTilJobbsøkerKnapp from './LeggTilJobbsøkerKnapp';
import { useJobbsøkerSøkContext } from './filter/JobbsøkerSøkContext';
import { JobbsøkerSøkTreffDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import {
  JobbsøkerStatus,
  RekrutteringstreffStatus,
} from '@/app/rekrutteringstreff/_types/constants';
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

const erInviterbar = (j: JobbsøkerSøkTreffDTO) =>
  j.status === JobbsøkerStatus.LAGT_TIL;

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
  const { valgteJobbsøkere, fjernAlleValg } = useJobbsøkerValg();

  const fraAntall = totalt === 0 ? 0 : (side - 1) * antallPerSide + 1;
  const tilAntall = totalt === 0 ? 0 : side * antallPerSide;

  const invitertePersonTreffIder = new Set(
    jobbsøkere.filter((j) => !erInviterbar(j)).map((j) => j.personTreffId),
  );
  const valgteSomIkkeErInvitert = valgteJobbsøkere.filter(
    (j) => !invitertePersonTreffIder.has(j.personTreffId),
  );

  const visInviterKnapper =
    treffStatus === RekrutteringstreffStatus.PUBLISERT && jobbsøkere.length > 0;

  return (
    <div className='flex flex-wrap items-center justify-between gap-2'>
      <div className='flex flex-row flex-wrap items-center gap-4'>
        <LeggTilJobbsøkerKnapp størrelse={'small'} />
        {visInviterKnapper && (
          <>
            <Button
              size='small'
              disabled={valgteSomIkkeErInvitert.length === 0}
              onClick={() => onÅpneInviter(valgteSomIkkeErInvitert)}
            >
              Inviter ({valgteSomIkkeErInvitert.length})
            </Button>
            <Button
              variant='secondary'
              size='small'
              disabled={valgteJobbsøkere.length === 0}
              onClick={fjernAlleValg}
            >
              Fjern markerte ({valgteJobbsøkere.length})
            </Button>
          </>
        )}
        <div className='flex gap-4 text-sm text-gray-400'>
          <span>
            Skjulte: <strong>{antallSkjulte}</strong>
          </span>
          <span>
            Slettede: <strong>{antallSlettede}</strong>
          </span>
        </div>
      </div>
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
