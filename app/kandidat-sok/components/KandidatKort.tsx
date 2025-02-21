import {
  FileSearchIcon,
  HandHeartIcon,
  HandShakeHeartIcon,
  HouseIcon,
  PinIcon,
} from '@navikt/aksel-icons';
import { Checkbox, Heading, Link } from '@navikt/ds-react';
import * as React from 'react';
import TekstMedIkon from '../../components/TekstMedIkon';

import { KandidatDataSchemaDTO } from '../../api/kandidat-sok/schema/cvSchema.zod';
import {
  hentKandidatensNavn,
  hentKandidatensØnskedeSteder,
  hentKandidatensØnskedeYrker,
} from '../util';
import { alleInnsatsgrupper } from './innsatsgrupper';

type IKandidatKort = {
  kandidat: KandidatDataSchemaDTO;
  markert: boolean;
  erIListen: boolean;
};

const KandidatKort: React.FC<IKandidatKort> = ({ kandidat, markert }) => {
  return (
    <div className='border rounded-lg mb-4 border-gray-300 px-4 pb-4 pt-2 flex flex-row '>
      <Checkbox aria-selected={markert} hideLabel className='mr-4' value='1'>
        Checkbox
      </Checkbox>
      <div className='flex-grow mt-2'>
        <Heading className='underline' size='small'>
          <Link href={`/kandidat/${kandidat.arenaKandidatnr}`}>
            {hentKandidatensNavn(kandidat)}
          </Link>
        </Heading>
        <div className='flex items-row '>
          <div className='w-full'>
            <div className='flex flex-row gap-4 mt-2'>
              <TekstMedIkon
                ikon={<PinIcon />}
                tekst={hentKandidatensØnskedeSteder(kandidat) ?? '-'}
              />

              <TekstMedIkon
                ikon={<HouseIcon />}
                tekst={`${kandidat.postnummer ?? '-'} ${kandidat.kommuneNavn ?? '-'}`}
              />
            </div>
            <div className='flex flex-row gap-4 mt-2'>
              <TekstMedIkon
                ikon={<HandShakeHeartIcon />}
                tekst={hentKandidatensØnskedeYrker(kandidat) ?? '-'}
              />
              <TekstMedIkon
                ikon={<HandHeartIcon />}
                tekst={alleInnsatsgrupper[kandidat.innsatsgruppe].label}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center flex-end font-bold mr-4 gap-2'>
        {/* <Link href={`/stillings-sok/kandidat/${kandidat.arenaKandidatnr}`}> */}
        <Link
          href={`/kandidat/${kandidat.arenaKandidatnr}?visFane=forslagTilStilling`}
        >
          <TekstMedIkon ikon={<FileSearchIcon />} tekst='Finn stilling' />
        </Link>
        {/* </Link> */}
        {/* <Link href={`/stillings-sok/kandidat/${kandidat.arenaKandidatnr}`}> */}
        {/* <TekstMedIkon ikon={<TasklistIcon />} tekst='Stillinger' /> */}
        {/* </Link> */}
      </div>
    </div>
  );
};

export default KandidatKort;
