'use client';

import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { InviterInternalDto, InviterModal } from './InviterModal';
import JobbsøkerKort from './JobbsøkerKort';
import LeggTilJobbsøkerKnapp from './LeggTilJobbsøkerKnapp';
import {
  JobbsøkerDTO,
  useJobbsøkere,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import {
  AktivtSteg,
  JobbsøkerHendelsestype,
} from '@/app/rekrutteringstreff/_types/constants';
import SWRLaster from '@/components/SWRLaster';
import { BodyShort, Button, TagProps } from '@navikt/ds-react';
import { format } from 'date-fns';
import { useRef, useState } from 'react';
import * as React from 'react';

const erInvitert = (j: JobbsøkerDTO) =>
  j.hendelser.some(
    (h: { hendelsestype: string }) => h.hendelsestype === 'INVITER',
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

const Jobbsøkere = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { treff: rekrutteringstreffData, activeStep } =
    useRekrutteringstreffData();
  const jobbsøkerHook = useJobbsøkere(rekrutteringstreffId);
  const inviterModalRef = useRef<HTMLDialogElement>(null);

  const [valgteJobbsøkere, setValgteJobbsøkere] = useState<
    InviterInternalDto[]
  >([]);
  // Separate state to control which job seekers are included in the InviterModal,
  // decoupled from the checkbox selection state above
  const [inviterModalJobbsøkere, setInviterModalJobbsøkere] = useState<
    InviterInternalDto[]
  >([]);

  const harAvsluttetInvitasjon =
    rekrutteringstreffData?.hendelser?.some(
      (h) => h.hendelsestype === 'AVSLUTT_INVITASJON',
    ) ?? false;

  const handleCheckboxChange = (jobbsøker: JobbsøkerDTO, erValgt: boolean) => {
    if (harAvsluttetInvitasjon && !erInvitert(jobbsøker)) {
      return;
    }
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
    if (harAvsluttetInvitasjon) {
      return;
    }

    const dto = jobbsøkerTilInviterDto(jobbsøker);

    // Open the modal with only this person, without changing checkbox selections
    setInviterModalJobbsøkere([dto]);
    inviterModalRef.current?.showModal();
  };

  const getLagtTilData = (jobbsøker: JobbsøkerDTO) => {
    const sisteRelevanteHendelse = [...jobbsøker.hendelser]
      .filter((h) => statusInfoForHendelsestype(h.hendelsestype))
      .sort(
        (a, b) =>
          new Date(b.tidspunkt).getTime() - new Date(a.tidspunkt).getTime(),
      )[0];

    if (sisteRelevanteHendelse) {
      const status = statusInfoForHendelsestype(
        sisteRelevanteHendelse.hendelsestype,
      ) as StatusInfo;

      return {
        status,
        datoLagtTil: sisteRelevanteHendelse.tidspunkt,
        lagtTilAv: sisteRelevanteHendelse.aktørIdentifikasjon,
      };
    }

    return {
      status: undefined,
      datoLagtTil: 'Ukjent dato',
      lagtTilAv: 'Ukjent',
    };
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
        const jobbsøkereSomKanLeggesTil = !harAvsluttetInvitasjon
          ? inviterbareJobbsøkere
          : [];
        const kanViseMarkerAlle = jobbsøkere.length > 0;

        return (
          <div className='p-4 flex flex-col gap-4'>
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
                {activeStep === AktivtSteg.INVITERE && (
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

            {jobbsøkere.length === 0 ? (
              <BodyShort>Ingen jobbsøkere lagt til</BodyShort>
            ) : (
              <ul>
                {jobbsøkere.map((j, idx) => {
                  const { status, datoLagtTil, lagtTilAv } = getLagtTilData(j);
                  const erDeaktivert = harAvsluttetInvitasjon && !erInvitert(j);
                  const kanInviteres =
                    activeStep === AktivtSteg.INVITERE && !erInvitert(j);

                  return (
                    <li key={idx}>
                      <JobbsøkerKort
                        fornavn={j.fornavn}
                        etternavn={j.etternavn}
                        personTreffId={j.personTreffId}
                        fødselsnummer={j.fødselsnummer}
                        navKontor={j.navkontor}
                        veileder={{
                          navn: j.veilederNavn,
                          navIdent: j.veilederNavIdent,
                        }}
                        datoLagtTil={format(
                          new Date(datoLagtTil),
                          'dd.MM.yyyy',
                        )}
                        lagtTilAv={lagtTilAv}
                        status={status?.text}
                        statusVariant={status?.variant}
                        aktivtSteg={activeStep}
                        erValgt={valgteJobbsøkere.some(
                          (v) => v.fødselsnummer === j.fødselsnummer,
                        )}
                        onCheckboxChange={(valgt) =>
                          handleCheckboxChange(j, valgt)
                        }
                        erDeaktivert={erDeaktivert}
                        kanInviteres={kanInviteres}
                        onInviterClick={() => handleInviterDirekte(j)}
                      />
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
                  prev.filter((j) => j.fødselsnummer !== fnr),
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

export type StatusVariant = TagProps['variant'];
export type StatusInfo = { text: string; variant: StatusVariant };

export const statusInfoForHendelsestype = (
  hendelsestype: string,
): StatusInfo | undefined => {
  switch (hendelsestype) {
    case JobbsøkerHendelsestype.AKTIVITETSKORT_OPPRETTELSE_FEIL:
      return { text: 'Invitasjon feilet', variant: 'error' };
    case JobbsøkerHendelsestype.SVART_JA_TREFF_AVLYST:
      return { text: 'Treff avlyst', variant: 'warning' };
    case JobbsøkerHendelsestype.SVART_JA_TREFF_FULLFØRT:
      return { text: 'Treff fullført', variant: 'success' };
    case JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON:
      return { text: 'Svart ja', variant: 'success' };
    case JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON:
      return { text: 'Svart nei', variant: 'neutral' };
    case JobbsøkerHendelsestype.INVITERT:
      return { text: 'Invitert', variant: 'info' };
    case JobbsøkerHendelsestype.OPPRETTET:
      return { text: 'Lagt til', variant: 'info' };
    default:
      return undefined;
  }
};
