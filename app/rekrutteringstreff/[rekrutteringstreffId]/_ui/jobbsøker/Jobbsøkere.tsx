'use client';

import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { InviterInternalDto, InviterModal } from './InviterModal';
import JobbsøkerKort from './JobbsøkerKort';
import LeggTilJobbsøkerKnapp from './LeggTilJobbsøkerKnapp';
import { useAlleHendelser } from '@/app/api/rekrutteringstreff/[...slug]/allehendelser/useAlleHendelser';
import {
  JobbsøkerDTO,
  useJobbsøkere,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { HendelseDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import {
  RekrutteringstreffStatus,
  JobbsøkerHendelsestype,
} from '@/app/rekrutteringstreff/_types/constants';
import SWRLaster from '@/components/SWRLaster';
import { BodyShort, Button } from '@navikt/ds-react';
import { useRef, useState } from 'react';
import * as React from 'react';

const erInvitert = (j: JobbsøkerDTO) =>
  j.hendelser.some(
    (h: { hendelsestype: string }) =>
      h.hendelsestype === JobbsøkerHendelsestype.INVITERT,
  );

const jobbsøkerTilInviterDto = (
  jobbsøker: JobbsøkerDTO,
): InviterInternalDto => ({
  personTreffId: jobbsøker.personTreffId,
  fornavn: jobbsøker.fornavn,
  etternavn: jobbsøker.etternavn,
  fødselsnummer: jobbsøker.fødselsnummer,
  veilederNavIdent: jobbsøker.veilederNavIdent,
});

// Polling-intervall for å oppdatere jobbsøkerhendelser (SMS-status, invitasjonsstatus, etc.)
const JOBBSØKER_POLLING_INTERVALL_MS = 10000;

const Jobbsøkere = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { treff } = useRekrutteringstreffData();
  const hendelser = useAlleHendelser(rekrutteringstreffId).data;
  const jobbsøkerHook = useJobbsøkere(
    rekrutteringstreffId,
    JOBBSØKER_POLLING_INTERVALL_MS,
  );
  const inviterModalRef = useRef<HTMLDialogElement>(null);

  const [valgteJobbsøkere, setValgteJobbsøkere] = useState<
    InviterInternalDto[]
  >([]);
  // Separate state to control which job seekers are included in the InviterModal,
  // decoupled from the checkbox selection state above
  const [inviterModalJobbsøkere, setInviterModalJobbsøkere] = useState<
    InviterInternalDto[]
  >([]);

  const erIkkeSlettet =
    hendelser?.some(
      (h) => h.hendelsestype !== RekrutteringstreffStatus.SLETTET,
    ) ?? false;
  const erIkkeAvlyst =
    hendelser?.some(
      (h) => h.hendelsestype !== RekrutteringstreffStatus.AVLYST,
    ) ?? false;

  const kanInvitere =
    (hendelser?.some(
      (h) => h.hendelsestype === RekrutteringstreffStatus.PUBLISERT,
    ) ??
      false) &&
    erIkkeSlettet &&
    erIkkeAvlyst;

  const handleCheckboxChange = (jobbsøker: JobbsøkerDTO, erValgt: boolean) => {
    const dto = jobbsøkerTilInviterDto(jobbsøker);

    setValgteJobbsøkere((prev) =>
      erValgt
        ? prev.some((j) => j.fødselsnummer === dto.fødselsnummer)
          ? prev
          : [...prev, dto]
        : prev.filter((j) => j.fødselsnummer !== dto.fødselsnummer),
    );
  };

  const handleMarkerAlle = (jobbsøkereSomKanLeggesTil: JobbsøkerDTO[]) => {
    if (jobbsøkereSomKanLeggesTil.length === 0) {
      return;
    }

    setValgteJobbsøkere((prev) => {
      const valgtMap = new Map(prev.map((j) => [j.fødselsnummer, j]));
      jobbsøkereSomKanLeggesTil.forEach((jobbsøker) => {
        const dto = jobbsøkerTilInviterDto(jobbsøker);
        valgtMap.set(dto.fødselsnummer, dto);
      });

      return Array.from(valgtMap.values());
    });
  };

  const handleInviterDirekte = (jobbsøker: JobbsøkerDTO) => {
    const dto = jobbsøkerTilInviterDto(jobbsøker);

    // Open the modal with only this person, without changing checkbox selections
    setInviterModalJobbsøkere([dto]);
    inviterModalRef.current?.showModal();
  };

  const handleInvitasjonSendt = () => {
    inviterModalRef.current?.close();
    setInviterModalJobbsøkere([]);
    setValgteJobbsøkere([]);
    jobbsøkerHook.mutate();
  };

  return (
    <SWRLaster hooks={[jobbsøkerHook]}>
      {(jobbsøkere) => {
        const invitertePersonTreffIder = new Set(
          jobbsøkere.filter(erInvitert).map((j) => j.personTreffId),
        );

        const valgteSomIkkeErInvitert = valgteJobbsøkere.filter(
          (j) => !invitertePersonTreffIder.has(j.personTreffId),
        );

        const inviterbareJobbsøkere = jobbsøkere.filter(
          (j) => !invitertePersonTreffIder.has(j.personTreffId),
        );
        const jobbsøkereSomKanLeggesTil = kanInvitere
          ? inviterbareJobbsøkere
          : [];
        const kanViseMarkerAlle = jobbsøkere.length > 0;

        return (
          <div className='flex flex-col gap-4 p-4'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
              <div className='flex items-center gap-2'>
                {kanViseMarkerAlle && (
                  <Button
                    variant='secondary'
                    size='small'
                    onClick={() => handleMarkerAlle(jobbsøkereSomKanLeggesTil)}
                    disabled={jobbsøkereSomKanLeggesTil.length === 0}
                  >
                    Marker alle
                  </Button>
                )}
              </div>
              <div className='flex items-center gap-2'>
                {treff?.status == RekrutteringstreffStatus.PUBLISERT && (
                  <Button
                    disabled={valgteSomIkkeErInvitert.length === 0}
                    onClick={() => {
                      setInviterModalJobbsøkere(valgteSomIkkeErInvitert);
                      inviterModalRef.current?.showModal();
                    }}
                  >
                    Inviter ({valgteSomIkkeErInvitert.length})
                  </Button>
                )}
                <LeggTilJobbsøkerKnapp
                  rekrutteringstreffStatus={treff?.status}
                />
              </div>
            </div>

            {jobbsøkere.length === 0 ? (
              <BodyShort>Ingen jobbsøkere lagt til</BodyShort>
            ) : (
              <ul>
                {jobbsøkere.map((jobbsøker, idx) => {
                  const sisteRelevanteHendelse: HendelseDTO = [
                    ...jobbsøker.hendelser,
                  ].sort(
                    (a, b) =>
                      new Date(b.tidspunkt).getTime() -
                      new Date(a.tidspunkt).getTime(),
                  )[0];

                  return (
                    <li key={idx}>
                      {treff && (
                        <JobbsøkerKort
                          fornavn={jobbsøker.fornavn}
                          etternavn={jobbsøker.etternavn}
                          personTreffId={jobbsøker.personTreffId}
                          fødselsnummer={jobbsøker.fødselsnummer}
                          navKontor={jobbsøker.navkontor}
                          veileder={{
                            navn: jobbsøker.veilederNavn,
                            navIdent: jobbsøker.veilederNavIdent,
                          }}
                          status={jobbsøker.status}
                          sisteRelevanteHendelse={sisteRelevanteHendelse}
                          hendelser={jobbsøker.hendelser}
                          erValgt={valgteJobbsøkere.some(
                            (v) => v.fødselsnummer === jobbsøker.fødselsnummer,
                          )}
                          onCheckboxChange={(valgt) =>
                            handleCheckboxChange(jobbsøker, valgt)
                          }
                          erDeaktivert={false}
                          onInviterClick={() => handleInviterDirekte(jobbsøker)}
                          jobbsøkereHook={jobbsøkerHook}
                          rekrutteringstreffId={rekrutteringstreffId}
                          rekrutteringstreffStatus={treff.status}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            )}

            <InviterModal
              modalref={inviterModalRef}
              inviterInternalDtoer={inviterModalJobbsøkere}
              onInvitasjonSendt={handleInvitasjonSendt}
              onFjernJobbsøker={(fnr) =>
                setInviterModalJobbsøkere((prev) =>
                  prev.filter((jobbsøker) => jobbsøker.fødselsnummer !== fnr),
                )
              }
            />
          </div>
        );
      }}
    </SWRLaster>
  );
};

export default Jobbsøkere;
