'use client';

import { InviterInternalDto, InviterModal } from './_ui/InviterModal';
import JobbsøkerKort from './_ui/JobbsøkerKort';
import OppmøteModal from './_ui/OppmøteModal';
import {
  JobbsøkerDTO,
  useJobbsøkere,
} from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import LeggTilJobbsøkerKnapp from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/LeggTilJobbsøkerKnapp';
import SWRLaster from '@/components/SWRLaster';
import { BodyShort, Button, TagProps } from '@navikt/ds-react';
import { format } from 'date-fns';
import * as React from 'react';

const erInvitert = (j: JobbsøkerDTO) =>
  j.hendelser.some((h) => h.hendelsestype === 'INVITER');

const harMøttOpp = (j: JobbsøkerDTO) =>
  j.hendelser.some((h) => h.hendelsestype === 'MØT_OPP');

const harIkkeMøttOpp = (j: JobbsøkerDTO) =>
  j.hendelser.some((h) => h.hendelsestype === 'IKKE_MØT_OPP');

const Jobbsøkere = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const jobbsøkerHook = useJobbsøkere(rekrutteringstreffId);
  const inviterModalRef = React.useRef<HTMLDialogElement>(null);
  const oppmøteModalRef = React.useRef<HTMLDialogElement>(null);

  const { data: rekrutteringstreffData } =
    useRekrutteringstreff(rekrutteringstreffId);

  const [valgteJobbsøkere, setValgteJobbsøkere] = React.useState<
    InviterInternalDto[]
  >([]);

  const harPublisert =
    rekrutteringstreffData?.hendelser?.some(
      (h) => h.hendelsestype === 'PUBLISER',
    ) ?? false;

  const harAvsluttetInvitasjon =
    rekrutteringstreffData?.hendelser?.some(
      (h) => h.hendelsestype === 'AVSLUTT_INVITASJON',
    ) ?? false;

  const harAvsluttetOppfølging =
    rekrutteringstreffData?.hendelser?.some(
      (h) => h.hendelsestype === 'AVSLUTT_OPPFØLGING',
    ) ?? false;

  const handleCheckboxChange = (jobbsøker: JobbsøkerDTO, erValgt: boolean) => {
    if (harAvsluttetInvitasjon && !erInvitert(jobbsøker)) {
      return;
    }
    const dto: InviterInternalDto = {
      personTreffId: jobbsøker.personTreffId,
      fornavn: jobbsøker.fornavn,
      etternavn: jobbsøker.etternavn,
      fødselsnummer: jobbsøker.fødselsnummer,
      veilederNavIdent: jobbsøker.veilederNavIdent,
    };

    setValgteJobbsøkere((prev) =>
      erValgt
        ? [...prev, dto]
        : prev.filter((j) => j.fødselsnummer !== dto.fødselsnummer),
    );
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
    setValgteJobbsøkere([]);
    jobbsøkerHook.mutate();
  };

  const handleOppmøteSendt = () => {
    oppmøteModalRef.current?.close();
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

        const personerMedOppmøtestatusIder = new Set(
          jobbsøkere
            .filter((j) => harMøttOpp(j) || harIkkeMøttOpp(j))
            .map((j) => j.personTreffId),
        );

        const valgteUtenOppmøtestatus = valgteJobbsøkere.filter(
          (j) => !personerMedOppmøtestatusIder.has(j.personTreffId),
        );

        return (
          <div className='p-4 flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <LeggTilJobbsøkerKnapp />
              {harPublisert && !harAvsluttetInvitasjon && (
                <Button
                  disabled={valgteSomIkkeErInvitert.length === 0}
                  onClick={() => inviterModalRef.current?.showModal()}
                >
                  Inviter ({valgteSomIkkeErInvitert.length})
                </Button>
              )}
              {harAvsluttetInvitasjon && !harAvsluttetOppfølging && (
                <Button
                  disabled={valgteUtenOppmøtestatus.length === 0}
                  onClick={() => oppmøteModalRef.current?.showModal()}
                >
                  Marker Oppmøte ({valgteUtenOppmøtestatus.length})
                </Button>
              )}
            </div>

            {jobbsøkere.length === 0 ? (
              <BodyShort>Ingen jobbsøkere lagt til</BodyShort>
            ) : (
              <ul>
                {jobbsøkere.map((j, idx) => {
                  const { status, datoLagtTil, lagtTilAv } = getLagtTilData(j);
                  const erDeaktivert = harAvsluttetInvitasjon && !erInvitert(j);

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
                        harPublisert={harPublisert}
                        erValgt={valgteJobbsøkere.some(
                          (v) => v.fødselsnummer === j.fødselsnummer,
                        )}
                        onCheckboxChange={(valgt) =>
                          handleCheckboxChange(j, valgt)
                        }
                        erDeaktivert={erDeaktivert}
                      />
                    </li>
                  );
                })}
              </ul>
            )}

            <InviterModal
              modalref={inviterModalRef}
              inviterInternalDtoer={valgteSomIkkeErInvitert}
              onInvitasjonSendt={handleInvitasjonSendt}
              onFjernJobbsøker={(fnr) =>
                setValgteJobbsøkere((prev) =>
                  prev.filter((j) => j.fødselsnummer !== fnr),
                )
              }
            />

            <OppmøteModal
              modalref={oppmøteModalRef}
              oppmøteInternalDtoer={valgteUtenOppmøtestatus}
              onOppmøteSendt={handleOppmøteSendt}
              onFjernJobbsøker={(fnr) =>
                setValgteJobbsøkere((prev) =>
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
    case 'AKTIVITETSKORT_OPPRETTELSE_FEIL':
      return { text: 'Invitasjon feilet', variant: 'error' };
    case 'SVAR_JA_TIL_INVITASJON':
      return { text: 'Svart ja', variant: 'success' };
    case 'SVAR_NEI_TIL_INVITASJON':
      return { text: 'Svart nei', variant: 'neutral' };
    case 'INVITER':
      return { text: 'Invitert', variant: 'info' };
    case 'OPPRETT':
      return { text: 'Lagt til', variant: 'info' };
    case 'MØT_OPP':
      return { text: 'Møtt opp', variant: 'info' };
    case 'IKKE_MØT_OPP':
      return { text: 'Ikke møtt opp', variant: 'info' };
    default:
      return undefined;
  }
};
