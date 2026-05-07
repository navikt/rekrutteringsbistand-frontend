'use client';

import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { InviterInternalDto, InviterModal } from './InviterModal';
import JobbsøkerHandlingsrad from './JobbsøkerHandlingsrad';
import JobbsøkerListe from './JobbsøkerListe';
import { useJobbsøkerValg } from './JobbsøkerValgContext';
import JobbsøkerFilterrad from './filter/JobbsøkerFilterrad';
import { useJobbsøkerSøkContext } from './filter/JobbsøkerSøkContext';
import {
  JobbsøkerSøkResponsDTO,
  useJobbsøkerSøk,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import IngenJobbsøkereMelding from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/IngenJobbsøkereMelding';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import { Alert, Link } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';

const JOBBSØKER_POLLING_INTERVALL_MS = 3000;

const JobbsøkereInnhold = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { treff } = useRekrutteringstreffData();
  const søkState = useJobbsøkerSøkContext();
  const { fjernAlleValg } = useJobbsøkerValg();

  const jobbsøkerHook = useJobbsøkerSøk(
    rekrutteringstreffId,
    {
      side: søkState.side,
      antallPerSide: søkState.antallPerSide,
      sorteringsfelt: søkState.sorteringsfelt,
      sorteringsretning: søkState.sorteringsretning,
      fritekst: søkState.fritekst || undefined,
      status: søkState.status.length > 0 ? søkState.status : undefined,
    },
    JOBBSØKER_POLLING_INTERVALL_MS,
  );

  const inviterModalRef = useRef<HTMLDialogElement>(null);
  const [inviterModalJobbsøkere, setInviterModalJobbsøkere] = useState<
    InviterInternalDto[]
  >([]);

  const filterNøkkel = `${søkState.fritekst}|${søkState.status.join(',')}`;
  useEffect(() => {
    fjernAlleValg();
  }, [filterNøkkel, fjernAlleValg]);

  useEffect(() => {
    const responsSide = jobbsøkerHook.data?.side;
    if (responsSide !== undefined && responsSide !== søkState.side) {
      søkState.setSide(responsSide);
    }
  }, [jobbsøkerHook.data?.side, søkState.side, søkState.setSide]);

  const oppdaterJobbsøkere = () => {
    void jobbsøkerHook.mutate();
  };

  const åpneInviterModal = (jobbsøkere: InviterInternalDto[]) => {
    setInviterModalJobbsøkere(jobbsøkere);
    inviterModalRef.current?.showModal();
  };

  const håndterInvitasjonSendt = () => {
    inviterModalRef.current?.close();
    setInviterModalJobbsøkere([]);
    fjernAlleValg();
    oppdaterJobbsøkere();
  };

  return (
    <div className='flex flex-col gap-4'>
      <JobbsøkerFilterrad
        antallPerStatus={jobbsøkerHook.data?.antallPerStatus}
      />
      <SWRLaster<[JobbsøkerSøkResponsDTO | null]> hooks={[jobbsøkerHook]}>
        {(data) => {
          if (!data) return null;
          const { jobbsøkere, totalt, antallSkjulte, antallSlettede, side } =
            data;

          return (
            <>
              <JobbsøkerHandlingsrad
                jobbsøkere={jobbsøkere}
                side={side}
                totalt={totalt}
                antallSkjulte={antallSkjulte}
                antallSlettede={antallSlettede}
                treffStatus={treff?.status}
                onÅpneInviter={åpneInviterModal}
              />

              {jobbsøkere.length > 0 && treff?.status ? (
                <JobbsøkerListe
                  jobbsøkere={jobbsøkere}
                  rekrutteringstreffId={rekrutteringstreffId}
                  treffStatus={treff.status}
                  onMutate={oppdaterJobbsøkere}
                />
              ) : søkState.harAktiveFiltre ? (
                <Alert variant='info' className='m-4'>
                  Ingen jobbsøkere matcher det aktive filteret.{' '}
                  <Link as='button' onClick={søkState.tømAlleFiltre}>
                    Tøm alle filtre
                  </Link>
                </Alert>
              ) : (
                <IngenJobbsøkereMelding />
              )}
            </>
          );
        }}
      </SWRLaster>

      <InviterModal
        modalref={inviterModalRef}
        inviterInternalDtoer={inviterModalJobbsøkere}
        onInvitasjonSendt={håndterInvitasjonSendt}
        onFjernJobbsøker={(personTreffId) =>
          setInviterModalJobbsøkere((prev) =>
            prev.filter((j) => j.personTreffId !== personTreffId),
          )
        }
      />
    </div>
  );
};

const Jobbsøkere = () => <JobbsøkereInnhold />;

export default Jobbsøkere;
