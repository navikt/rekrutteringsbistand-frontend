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
  navKontor?: string;
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
  navn?: string;
  navIdent?: string;
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

const getLagtTilData = (sisteRelevanteHendelse?: HendelseDTO) => {
  if (sisteRelevanteHendelse) {
    return {
      datoLagtTil: sisteRelevanteHendelse.tidspunkt,
      lagtTilAv: sisteRelevanteHendelse.aktørIdentifikasjon,
    };
  }

  return {
    datoLagtTil: 'Ukjent dato',
    lagtTilAv: 'Ukjent',
  };
};

const getMinsideSvarHendelse = (
  hendelser?: HendelseDTO[],
): MinsideVarselSvarData | null => {
  if (!hendelser) return null;

  const minsideHendelser = hendelser.filter(
    (h) => h.hendelsestype === JobbsøkerHendelsestype.MOTTATT_SVAR_FRA_MINSIDE,
  );

  // Filtrer på relevante statuser
  const relevanteHendelser = minsideHendelser.filter((h) => {
    const data = h.hendelseData as MinsideVarselSvarData;
    const status = data?.eksternStatus;
    return (
      status === 'FERDIGSTILT' ||
      status === 'FEILET' ||
      status === 'SENDT' ||
      status === 'FEIL'
    );
  });

  if (relevanteHendelser.length === 0) return null;

  // Sorter hendelser slik at vi prioriterer ferdige statuser ved likt tidspunkt
  const sorted = relevanteHendelser.sort((a, b) => {
    const timeDiff =
      new Date(b.tidspunkt).getTime() - new Date(a.tidspunkt).getTime();

    if (timeDiff !== 0) return timeDiff;

    // Hvis tidspunkt er likt, prioriter statuser
    const getStatusPriority = (data: any) => {
      const status = data?.eksternStatus;
      if (status === 'FERDIGSTILT') return 3;
      if (status === 'FEILET' || status === 'FEIL') return 2;
      if (status === 'SENDT') return 1;
      return 0;
    };

    return (
      getStatusPriority(b.hendelseData) - getStatusPriority(a.hendelseData)
    );
  });

  const minsideHendelse = sorted[0];

  if (minsideHendelse?.hendelseData) {
    return minsideHendelse.hendelseData as MinsideVarselSvarData;
  }

  return null;
};

const formaterKanal = (kanal: string | null | undefined): string => {
  if (!kanal) return 'Min side';
  switch (kanal) {
    case 'SMS':
      return 'SMS';
    case 'EPOST':
      return 'Epost';
    default:
      return kanal.charAt(0).toUpperCase() + kanal.slice(1).toLowerCase();
  }
};

const getEksternStatusVariant = (
  status: string | null | undefined,
): TagProps['variant'] => {
  if (!status) return 'neutral';
  switch (status) {
    case 'FERDIGSTILT':
      return 'success';
    case 'SENDT':
      return 'info';
    case 'FEILET':
    case 'FEIL':
      return 'error';
    default:
      return 'neutral';
  }
};

const getStatusTekst = (status: string | null | undefined): string => {
  switch (status) {
    case 'FERDIGSTILT':
      return 'Levert';
    case 'SENDT':
      return 'Sendt';
    case 'FEILET':
    case 'FEIL':
      return 'Feilet';
    default:
      return 'Ukjent status';
  }
};

const buildMinsideTooltipContent = (data: MinsideVarselSvarData): string => {
  const lines: string[] = [];

  lines.push(getStatusTekst(data.eksternStatus));

  if (data.opprettet) {
    lines.push(format(new Date(data.opprettet), 'dd.MM.yyyy HH:mm'));
  }
  if (data.eksternFeilmelding) {
    lines.push(data.eksternFeilmelding);
  }

  return lines.join(' · ');
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
  const { datoLagtTil, lagtTilAv } = getLagtTilData(sisteRelevanteHendelse);
  const minsideSvarData = getMinsideSvarHendelse(hendelser);

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
          status == 'LAGT_TIL' &&
          onInviterClick && (
            <Button size='small' variant='secondary' onClick={onInviterClick}>
              Inviter
            </Button>
          )}

        <TooltipWithShowProperty
          content={'Kun kandidater med status LAGT_TIL kan slettes'}
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

        {minsideSvarData && (
          <Tooltip content={buildMinsideTooltipContent(minsideSvarData)}>
            <Tag
              size='small'
              variant={getEksternStatusVariant(minsideSvarData.eksternStatus)}
              className='cursor-help text-nowrap'
            >
              {formaterKanal(minsideSvarData.eksternKanal)}
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
