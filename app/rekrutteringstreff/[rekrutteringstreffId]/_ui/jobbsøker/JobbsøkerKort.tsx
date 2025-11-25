import NavnLink from './NavnLenke';
import {
  JobbsøkereDTO,
  JobbsøkerStatus,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { HendelseDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { storForbokstav } from '@/app/kandidat/util';
import SlettJobbsøkerModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/SlettJobbsøkerModal';
import { TooltipWithShowProperty } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/TooltipWithShowProperty';
import {
  AktivtSteg,
  JobbsøkerHendelsestype,
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
  status: JobbsøkerStatus;
  sisteRelevanteHendelse?: HendelseDTO;
  aktivtSteg: string;
  onCheckboxChange: (checked: boolean) => void;
  erValgt: boolean;
  erDeaktivert?: boolean;
  onInviterClick?: () => void;
  jobbsøkereHook?: Pick<SWRResponse<JobbsøkereDTO>, 'mutate'>;
  rekrutteringstreffId: string;
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
  status: JobbsøkerStatus,
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
    case 'SVART_JA':
      return { text: statusText, variant: 'success' };
    case 'SVART_NEI':
      return { text: statusText, variant: 'neutral' };
    case 'INVITERT':
    case 'LAGT_TIL':
      return { text: statusText, variant: 'info' };
    case 'SLETTET':
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

const JobbsøkerKort: FC<JobbsøkerKortProps> = ({
  fornavn,
  etternavn,
  personTreffId,
  navKontor,
  veileder,
  status,
  sisteRelevanteHendelse,
  aktivtSteg,
  onCheckboxChange,
  erValgt,
  erDeaktivert = false,
  onInviterClick,
  jobbsøkereHook,
  rekrutteringstreffId,
}) => {
  const [visSlettModal, setVisSlettModal] = useState(false);

  const statusSomTekstOgVariant = utledStatus(status, sisteRelevanteHendelse);
  const { datoLagtTil, lagtTilAv } = getLagtTilData(sisteRelevanteHendelse);

  return (
    <Box.New
      background='neutral-softA'
      borderRadius='xlarge'
      padding='4'
      marginBlock='2'
      className={`flex items-center justify-between`}
    >
      <div className='flex items-center gap-4'>
        {aktivtSteg === AktivtSteg.INVITERE && (
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
        {aktivtSteg === AktivtSteg.INVITERE &&
          status == 'LAGT_TIL' &&
          onInviterClick && (
            <Button size='small' variant='secondary' onClick={onInviterClick}>
              Inviter
            </Button>
          )}

        <TooltipWithShowProperty
          content={'Kun kandidater med status LAGT_TIL kan slettes'}
          showTooltip={status !== 'LAGT_TIL'}
        >
          <Button
            size='small'
            variant='secondary'
            disabled={status !== 'LAGT_TIL'}
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
