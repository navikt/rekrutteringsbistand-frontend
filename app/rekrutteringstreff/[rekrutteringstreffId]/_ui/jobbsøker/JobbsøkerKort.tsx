import NavnLink from './NavnLenke';
import {
  JobbsøkereDTO,
  JobbsøkerStatusType,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import {
  HendelseDTO,
  MinsideVarselSvarData,
} from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import { storForbokstav } from '@/app/kandidat/util';
import SlettJobbsøkerModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/SlettJobbsøkerModal';
import { TooltipWithShowProperty } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/TooltipWithShowProperty';
import {
  JobbsøkerHendelsestype,
  JobbsøkerStatus,
  RekrutteringstreffStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import { Buildings3Icon, PersonIcon, TrashIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  Checkbox,
  Heading,
  Tag,
  TagProps,
  Tooltip,
} from '@navikt/ds-react';
import { format } from 'date-fns';
import { FC, useState } from 'react';
import { SWRResponse } from 'swr';

interface JobbsøkerKortProps {
  fødselsnummer?: string;
  personTreffId: string;
  fornavn: string;
  etternavn: string;
  navKontor?: string | null;
  veileder?: Veileder | null;
  status: JobbsøkerStatusType;
  sisteRelevanteHendelse?: HendelseDTO;
  hendelser?: HendelseDTO[];
  onCheckboxChange: (checked: boolean) => void;
  erValgt: boolean;
  erDeaktivert?: boolean;
  onInviterClick?: () => void;
  jobbsøkereHook?: Pick<SWRResponse<JobbsøkereDTO>, 'mutate'>;
  rekrutteringstreffId: string;
  rekrutteringstreffStatus: RekrutteringstreffStatusType;
}

export type Veileder = {
  navn?: string | null;
  navIdent?: string | null;
};

type TekstOgVariant = {
  text: string;
  variant: TagProps['variant'];
};

export const utledStatus = (
  status: JobbsøkerStatusType,
  sisteRelevanteHendelse?: HendelseDTO,
): TekstOgVariant => {
  switch (sisteRelevanteHendelse?.hendelsestype) {
    case JobbsøkerHendelsestype.AKTIVITETSKORT_OPPRETTELSE_FEIL:
      return { text: 'Invitasjon feilet', variant: 'error' };
    case JobbsøkerHendelsestype.SVART_JA_TREFF_AVLYST:
      return { text: 'Treff avlyst', variant: 'warning' };
    case JobbsøkerHendelsestype.SVART_JA_TREFF_FULLFØRT:
      return { text: 'Treff fullført', variant: 'success' };
  }

  const statusText = storForbokstav(status)?.replaceAll('_', ' ') || '';
  switch (status) {
    case JobbsøkerStatus.SVART_JA:
      return { text: statusText, variant: 'success' };
    case JobbsøkerStatus.SVART_NEI:
      return { text: statusText, variant: 'neutral' };
    case JobbsøkerStatus.INVITERT:
    case JobbsøkerStatus.LAGT_TIL:
      return { text: statusText, variant: 'info' };
    case JobbsøkerStatus.SLETTET:
      return { text: statusText, variant: 'error' };
    default:
      return { text: statusText, variant: 'neutral' };
  }
};

const getLagtTilData = (hendelser?: HendelseDTO[]) => {
  const opprettetHendelse = hendelser?.find(
    (h) => h.hendelsestype === JobbsøkerHendelsestype.OPPRETTET,
  );

  if (opprettetHendelse) {
    return {
      datoLagtTil: opprettetHendelse.tidspunkt,
      lagtTilAv: opprettetHendelse.aktørIdentifikasjon,
    };
  }

  return {
    datoLagtTil: 'Ukjent dato',
    lagtTilAv: 'Ukjent',
  };
};

const getMinsideSvarHendelser = (
  hendelser?: HendelseDTO[],
): MinsideVarselSvarData[] => {
  if (!hendelser) return [];

  const minsideHendelser = hendelser.filter(
    (h) => h.hendelsestype === JobbsøkerHendelsestype.MOTTATT_SVAR_FRA_MINSIDE,
  );

  // Filtrer på relevante statuser
  const relevanteHendelser = minsideHendelser.filter((h) => {
    const data = h.hendelseData as MinsideVarselSvarData;
    const status = data?.eksternStatus;
    return status === 'SENDT' || status === 'FEILET';
  });

  if (relevanteHendelser.length === 0) return [];

  // Grupper etter varselId og behold kun siste status per varsel
  const varselMap = new Map<string, MinsideVarselSvarData>();

  // Sorter kronologisk først (eldste først)
  const sorted = relevanteHendelser.sort((a, b) => {
    return new Date(a.tidspunkt).getTime() - new Date(b.tidspunkt).getTime();
  });

  // For hvert varsel, behold siste hendelse (som overskriver tidligere)
  for (const hendelse of sorted) {
    const data = hendelse.hendelseData as MinsideVarselSvarData;
    if (data?.varselId) {
      varselMap.set(data.varselId, data);
    }
  }

  // Konverter tilbake til array og sorter etter opprettet-tidspunkt
  const unikeVarsler = Array.from(varselMap.values());
  unikeVarsler.sort((a, b) => {
    const timeA = a.opprettet ? new Date(a.opprettet).getTime() : 0;
    const timeB = b.opprettet ? new Date(b.opprettet).getTime() : 0;
    return timeA - timeB;
  });

  return unikeVarsler;
};

const getSisteMinsideSvarHendelse = (
  hendelser?: HendelseDTO[],
): MinsideVarselSvarData | null => {
  const alleMinsideHendelser = getMinsideSvarHendelser(hendelser);
  if (alleMinsideHendelser.length === 0) return null;

  return alleMinsideHendelser[alleMinsideHendelser.length - 1];
};

const formaterKanal = (kanal: string | null | undefined): string => {
  switch (kanal) {
    case 'SMS':
      return 'SMS';
    case 'EPOST':
      return 'Epost';
    default:
      return 'Feilet';
  }
};

const getEksternStatusVariant = (
  status: string | null | undefined,
): TagProps['variant'] => {
  if (!status) return 'neutral';
  switch (status) {
    case 'SENDT':
      return 'success';
    case 'FEILET':
      return 'error';
    default:
      return 'neutral';
  }
};

const getStatusTekst = (status: string | null | undefined): string => {
  switch (status) {
    case 'SENDT':
      return 'Levert';
    case 'FEILET':
      return 'Feilet';
    default:
      return 'Ukjent status';
  }
};

const formaterEndringer = (endringer: string[]): string => {
  if (endringer.length === 0) return '';
  if (endringer.length === 1) return endringer[0];
  return (
    endringer.slice(0, -1).join(', ') + ' og ' + endringer[endringer.length - 1]
  );
};

const getMalTekst = (
  mal: string | null | undefined,
  flettedata: string[] | null | undefined,
): string | null => {
  switch (mal) {
    case 'KANDIDAT_INVITERT_TREFF':
      return 'Invitert';
    case 'KANDIDAT_INVITERT_TREFF_ENDRET':
      if (flettedata && flettedata.length > 0) {
        return `Endret (${formaterEndringer(flettedata)})`;
      }
      return 'Endret';
    default:
      return null;
  }
};

const buildMinsideTooltipLine = (data: MinsideVarselSvarData): string => {
  const parts: string[] = [];

  const malTekst = getMalTekst(data.mal, data.flettedata);
  if (malTekst) {
    parts.push(malTekst);
  }

  parts.push(getStatusTekst(data.eksternStatus));

  if (data.opprettet) {
    parts.push(format(new Date(data.opprettet), 'dd.MM.yyyy HH:mm'));
  }
  if (data.eksternFeilmelding) {
    parts.push(data.eksternFeilmelding);
  }

  return parts.join(' · ');
};

const buildMinsideTooltipContent = (
  hendelser: MinsideVarselSvarData[],
): string => {
  if (hendelser.length === 0) return '';

  return hendelser.map((data) => buildMinsideTooltipLine(data)).join('\n');
};

const JobbsøkerKort: FC<JobbsøkerKortProps> = ({
  fornavn,
  etternavn,
  personTreffId,
  navKontor,
  veileder,
  status,
  sisteRelevanteHendelse,
  hendelser,
  onCheckboxChange,
  erValgt,
  erDeaktivert = false,
  onInviterClick,
  jobbsøkereHook,
  rekrutteringstreffId,
  rekrutteringstreffStatus,
}) => {
  const [visSlettModal, setVisSlettModal] = useState(false);

  const statusSomTekstOgVariant = utledStatus(status, sisteRelevanteHendelse);
  const { datoLagtTil, lagtTilAv } = getLagtTilData(hendelser);
  const alleMinsideSvarData = getMinsideSvarHendelser(hendelser);
  const sisteMinsideSvarData = getSisteMinsideSvarHendelse(hendelser);

  return (
    <Box.New
      background='neutral-softA'
      borderRadius='xlarge'
      padding='4'
      marginBlock='2'
      className={`flex items-center justify-between`}
    >
      <div className='flex items-center gap-4'>
        {rekrutteringstreffStatus === RekrutteringstreffStatus.PUBLISERT && (
          <Checkbox
            hideLabel
            checked={erValgt}
            onChange={(e) => onCheckboxChange(e.target.checked)}
            disabled={erDeaktivert}
          >
            Velg kandidat {fornavn} {etternavn}
          </Checkbox>
        )}
        <div>
          <Heading size='small'>
            <NavnLink
              fornavn={fornavn}
              etternavn={etternavn}
              personTreffId={personTreffId}
              rekrutteringstreffId={rekrutteringstreffId}
            />
          </Heading>
          <BodyShort
            size='small'
            className='text-text-subtle mt-1 flex items-center gap-6'
          >
            {navKontor && (
              <span className='flex items-center gap-1'>
                <Buildings3Icon fontSize='1.25rem' />
                {navKontor}
              </span>
            )}
            {veileder?.navn && (
              <span className='flex items-center gap-1'>
                <PersonIcon fontSize='1.25rem' />
                Følges opp av {veileder.navn}{' '}
                {veileder.navIdent && `(${veileder.navIdent})`}
              </span>
            )}
            {lagtTilAv && datoLagtTil && (
              <span>
                Lagt til av {lagtTilAv},{' '}
                {format(new Date(datoLagtTil), 'dd.MM.yyyy')}
              </span>
            )}
          </BodyShort>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        {rekrutteringstreffStatus === RekrutteringstreffStatus.PUBLISERT &&
          status === JobbsøkerStatus.LAGT_TIL &&
          onInviterClick && (
            <Button size='small' variant='secondary' onClick={onInviterClick}>
              Inviter
            </Button>
          )}

        <TooltipWithShowProperty
          content={'Kan ikke slette jobbsøker som er invitert'}
          showTooltip={status !== JobbsøkerStatus.LAGT_TIL}
        >
          <Button
            size='small'
            variant='secondary'
            disabled={status !== JobbsøkerStatus.LAGT_TIL}
            icon={<TrashIcon aria-hidden />}
            onClick={() => setVisSlettModal(true)}
          >
            Slett
          </Button>
        </TooltipWithShowProperty>
        {visSlettModal && (
          <SlettJobbsøkerModal
            rekrutteringstreffId={rekrutteringstreffId}
            jobbsøkerId={personTreffId}
            jobbsøkerNavn={`${fornavn} ${etternavn}`}
            jobbsøkereHook={jobbsøkereHook}
            setVisModal={setVisSlettModal}
          />
        )}

        {sisteMinsideSvarData && (
          <Tooltip
            content={buildMinsideTooltipContent(alleMinsideSvarData)}
            className='text-left whitespace-pre-line'
          >
            <Tag
              size='small'
              variant={getEksternStatusVariant(
                sisteMinsideSvarData.eksternStatus,
              )}
              className='cursor-help text-nowrap'
            >
              {formaterKanal(sisteMinsideSvarData.eksternKanal)}
            </Tag>
          </Tooltip>
        )}

        <Tag
          size='medium'
          variant={statusSomTekstOgVariant.variant}
          className='text-nowrap'
        >
          {statusSomTekstOgVariant.text}
        </Tag>
      </div>
    </Box.New>
  );
};

export default JobbsøkerKort;
