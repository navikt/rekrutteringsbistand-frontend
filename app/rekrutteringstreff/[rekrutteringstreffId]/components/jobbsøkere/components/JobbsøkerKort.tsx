import NavnLink from './NavnLenke';
import { Buildings3Icon, PersonIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Checkbox,
  Heading,
  Tag,
  TagProps,
} from '@navikt/ds-react';
import * as React from 'react';

interface JobbsøkerKortProps {
  fødselsnummer?: string;
  personTreffId: string | null;
  fornavn: string;
  etternavn: string;
  navKontor?: string;
  veileder?: Veileder | null;
  datoLagtTil?: string;
  lagtTilAv?: string;
  status?: string;
  statusVariant?: TagProps['variant'];
  harPublisert: boolean;
  onCheckboxChange: (checked: boolean) => void;
  erValgt: boolean;
}

export type Veileder = {
  navn?: string;
  navIdent?: string;
};

const JobbsøkerKort: React.FC<JobbsøkerKortProps> = ({
  fornavn,
  etternavn,
  personTreffId,
  navKontor,
  veileder,
  datoLagtTil,
  lagtTilAv,
  status,
  statusVariant,
  harPublisert,
  onCheckboxChange,
  erValgt,
}) => {
  return (
    <Box.New
      background='raised'
      borderColor='neutral-subtleA'
      borderRadius='xlarge'
      borderWidth='1'
      padding='4'
      marginBlock='2'
      className='flex items-center justify-between'
    >
      <div className='flex items-center gap-4'>
        {harPublisert && (
          <Checkbox
            hideLabel
            checked={erValgt}
            onChange={(e) => onCheckboxChange(e.target.checked)}
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
            className='text-text-subtle flex gap-6 items-center mt-1'
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
                Lagt til av {lagtTilAv}, {datoLagtTil}
              </span>
            )}
          </BodyShort>
        </div>
      </div>
      <div>
        {status && (
          <Tag
            className={'mr-2'}
            size='medium'
            variant={statusVariant ?? 'info'}
          >
            {status}
          </Tag>
        )}
      </div>
    </Box.New>
  );
};

export default JobbsøkerKort;
