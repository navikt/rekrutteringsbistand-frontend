'use client';

import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { InviterInternalDto, InviterModal } from './InviterModal';
import JobbsøkerKort from './JobbsøkerKort';
import LeggTilJobbsøkerKnapp from './LeggTilJobbsøkerKnapp';
import {
  JobbsøkerDTO,
  useJobbsøkere,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import IngenJobbsøkereMelding from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/IngenJobbsøkereMelding';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import {
  JobbsøkerHendelsestype,
  RekrutteringstreffStatus,
  RelevanteJobbsøkerHendelser,
} from '@/app/rekrutteringstreff/_types/constants';
import SWRLaster from '@/components/SWRLaster';
import { Button } from '@navikt/ds-react';
import { useRef, useState } from 'react';

const erInvitert = (j: JobbsøkerDTO) =>
  j.hendelser.some(
    (h: { hendelsestype: string }) =>
      h.hendelsestype === JobbsøkerHendelsestype.INVITERT,
  );

const finnSisteRelevanteHendelse = <
  T extends { hendelsestype: string; tidspunkt: string },
>(
  hendelser: T[],
): T | undefined =>
  [...hendelser]
    .sort(
      (a, b) =>
        new Date(b.tidspunkt).getTime() - new Date(a.tidspunkt).getTime(),
    )
    .find((h) =>
      RelevanteJobbsøkerHendelser.has(
        h.hendelsestype as JobbsøkerHendelsestype,
      ),
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
  const jobbsøkerHook = useJobbsøkere(
    rekrutteringstreffId,
    JOBBSØKER_POLLING_INTERVALL_MS,
  );
  const inviterModalRef = useRef<HTMLDialogElement>(null);

  const [valgteJobbsøkere, setValgteJobbsøkere] = useState<
    InviterInternalDto[]
  >([]);
  // Egen state for å styre hvilke jobbsøkere som inkluderes i InviterModal,
  // frakoblet avkryssingsvalget over
  const [inviterModalJobbsøkere, setInviterModalJobbsøkere] = useState<
    InviterInternalDto[]
  >([]);

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

  const handleFjernAllMarkering = () => {
    if (valgteJobbsøkere.length === 0) {
      return;
    }
    setValgteJobbsøkere([]);
  };

  const handleInviterDirekte = (jobbsøker: JobbsøkerDTO) => {
    const dto = jobbsøkerTilInviterDto(jobbsøker);

    // Åpne modalen med kun denne personen, uten å endre avkryssingsvalg
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
      {({ jobbsøkere, antallSkjulte, antallSlettede }) => {
        const invitertePersonTreffIder = new Set(
          jobbsøkere.filter(erInvitert).map((j) => j.personTreffId),
        );

        const valgteSomIkkeErInvitert = valgteJobbsøkere.filter(
          (j) => !invitertePersonTreffIder.has(j.personTreffId),
        );

        return (
          <div className='flex flex-col gap-4 p-4'>
            {jobbsøkere.length > 0 ? (
              <>
                <div className='flex gap-4 text-sm text-gray-400'>
                  <span>
                    Skjulte: <strong>{antallSkjulte}</strong>
                  </span>
                  <span>
                    Slettede: <strong>{antallSlettede}</strong>
                  </span>
                </div>
                <div className='flex flex-row flex-wrap items-end justify-between gap-2'>
                  <Button
                    variant='secondary'
                    size='small'
                    onClick={() => handleFjernAllMarkering()}
                    disabled={valgteJobbsøkere.length === 0}
                  >
                    Fjern all markering
                  </Button>
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
                    <LeggTilJobbsøkerKnapp />
                  </div>
                </div>

                <ul>
                  {jobbsøkere.map((jobbsøker, idx) => {
                    const sisteRelevanteHendelse = finnSisteRelevanteHendelse(
                      jobbsøker.hendelser,
                    );

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
                              (v) =>
                                v.fødselsnummer === jobbsøker.fødselsnummer,
                            )}
                            onCheckboxChange={(valgt) =>
                              handleCheckboxChange(jobbsøker, valgt)
                            }
                            erDeaktivert={false}
                            onInviterClick={() =>
                              handleInviterDirekte(jobbsøker)
                            }
                            jobbsøkereHook={jobbsøkerHook}
                            rekrutteringstreffId={rekrutteringstreffId}
                            rekrutteringstreffStatus={treff.status}
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>

                <InviterModal
                  modalref={inviterModalRef}
                  inviterInternalDtoer={inviterModalJobbsøkere}
                  onInvitasjonSendt={handleInvitasjonSendt}
                  onFjernJobbsøker={(fnr) =>
                    setInviterModalJobbsøkere((prev) =>
                      prev.filter(
                        (jobbsøker) => jobbsøker.fødselsnummer !== fnr,
                      ),
                    )
                  }
                />
              </>
            ) : (
              <IngenJobbsøkereMelding />
            )}
          </div>
        );
      }}
    </SWRLaster>
  );
};

export default Jobbsøkere;
