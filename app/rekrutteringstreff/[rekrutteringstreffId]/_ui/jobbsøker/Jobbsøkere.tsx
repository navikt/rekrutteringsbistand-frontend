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
import ForFåJobbsøkereVarselBanner from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/omTreffet/ForFåJobbsøkereVarselBanner';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { datostrengTilDato } from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import { skalViseVarselSjekk } from '@/app/rekrutteringstreff/_utils/FærreEnnTreJaVarselSjekk';
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
      aldersgruppe:
        søkState.aldersgruppe.length > 0 ? søkState.aldersgruppe : undefined,
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
  }, [jobbsøkerHook.data?.side, søkState]);

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

  const svarfristSomDato = datostrengTilDato(treff?.svarfrist);
  const skalViseVarsel = skalViseVarselSjekk(
    treff?.status,
    jobbsøkerHook.data?.antallPerStatus[JobbsøkerStatus.SVART_JA] || 0,
    jobbsøkerHook.data?.antallPerStatus[JobbsøkerStatus.FÅTT_JOBB] || 0,
    svarfristSomDato,
  );

  return (
    <div className='flex flex-col gap-4'>
      {skalViseVarsel && (
        <ForFåJobbsøkereVarselBanner
          antallJobbsøkereSvartJa={
            jobbsøkerHook.data?.antallPerStatus[JobbsøkerStatus.SVART_JA] || 0
          }
          antallJobbsøkereFåttJobb={
            jobbsøkerHook.data?.antallPerStatus[JobbsøkerStatus.FÅTT_JOBB] || 0
          }
        />
      )}
      <JobbsøkerFilterrad
        antallPerStatus={jobbsøkerHook.data?.antallPerStatus}
        antallPerAldersgruppe={jobbsøkerHook.data?.antallPerAldersgruppe}
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
