import {
  HandHeartIcon,
  HandShakeHeartIcon,
  HouseIcon,
  PinIcon,
} from '@navikt/aksel-icons';
import { BodyLong, Checkbox, Heading } from '@navikt/ds-react';
import Link from 'next/link';
import * as React from 'react';
import { KandidatSchemaDTO } from '../../api/kandidatsok/types';
import {
  hentKandidatensNavn,
  hentKandidatensØnskedeSteder,
  hentKandidatensØnskedeYrker,
} from '../util';
import { alleInnsatsgrupper } from './innsatsgrupper';
// import TekstlinjeMedIkon from '../TekstlinjeMedIkon';

type IRekBisKortKandidat = {
  kandidat: KandidatSchemaDTO;
  markert: boolean;
  erIListen: boolean;
};

interface TekstlinjeMedIkon {
  ikon: React.ReactNode;
  tekst: string;
  label?: string;
  className?: string;
}
const TekstlinjeMedIkon: React.FC<TekstlinjeMedIkon> = ({
  ikon,
  tekst,
  label,
  className,
}) => {
  return <div>{tekst}</div>;
};

const RekBisKortKandidat: React.FC<IRekBisKortKandidat> = ({
  kandidat,
  markert,
  erIListen,
}) => {
  return (
    <div className='border rounded-lg mb-4 border-gray-300 px-4 pb-4 pt-2'>
      <div aria-selected={markert}>
        <div className='flex justify-between items-center'>
          <div className='flex items-center '>
            <Checkbox hideLabel className='mr-4' value='1'>
              Checkbox
            </Checkbox>
            <Heading className='underline' size='small'>
              <Link href={`/kandidat/${kandidat.arenaKandidatnr}`}>
                {hentKandidatensNavn(kandidat)}
              </Link>
            </Heading>
          </div>

          <div className='font-bold'>
            <Link href={`/stillingssok/kandidat/${kandidat.arenaKandidatnr}`}>
              Finn stilling
            </Link>
          </div>
        </div>
      </div>
      <div className='ml-10'>
        <div className='flex'>
          <div className='flex items-center mr-4' title='Ønsket sted'>
            <PinIcon />
            <BodyLong className='ml-2'>
              {hentKandidatensØnskedeSteder(kandidat) ?? '-'}
            </BodyLong>
          </div>
          <div className='flex items-center' title='Bosted'>
            <HouseIcon />
            <BodyLong className='ml-2'>
              {kandidat.postnummer ?? '-'} {kandidat.kommuneNavn ?? '-'}
            </BodyLong>
          </div>
        </div>
        <div>
          <div className='flex items-center' title='Ønsket yrke'>
            <HandShakeHeartIcon />
            <BodyLong className='ml-2'>
              {hentKandidatensØnskedeYrker(kandidat) ?? '-'}
            </BodyLong>
          </div>

          <div className='flex items-center' title='Innsatsgruppe'>
            <HandHeartIcon />
            <BodyLong className='ml-2'>
              {
                alleInnsatsgrupper[
                  kandidat.kvalifiseringsgruppekode as keyof typeof alleInnsatsgrupper
                ].label
              }
            </BodyLong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekBisKortKandidat;
