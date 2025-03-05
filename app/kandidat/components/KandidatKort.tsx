import { KandidatDataSchemaDTO } from '../../api/kandidat-sok/schema/cvSchema.zod';
import TekstMedIkon from '../../components/TekstMedIkon';
import { useKandidatSøkMarkerteContext } from '../KandidatSøkMarkerteContext';
import {
  hentKandidatensNavn,
  hentKandidatensØnskedeSteder,
  hentKandidatensØnskedeYrker,
} from '../util';
import { alleInnsatsgrupper } from './innsatsgrupper';
import {
  FileSearchIcon,
  HandHeartIcon,
  HandShakeHeartIcon,
  HouseIcon,
  PinIcon,
} from '@navikt/aksel-icons';
import { Checkbox, Heading, Link } from '@navikt/ds-react';
import * as React from 'react';

type IKandidatKort = {
  kandidat: KandidatDataSchemaDTO;
  alleredeLagtTil?: string[];
  stillingsId?: string;
};

const KandidatKort: React.FC<IKandidatKort> = ({
  kandidat,
  alleredeLagtTil,
  stillingsId,
}) => {
  const { markerteKandidater, setMarkert } = useKandidatSøkMarkerteContext();

  const erMarkert = markerteKandidater?.some(
    (k) => k === kandidat.arenaKandidatnr,
  );

  return (
    <div className='mb-4 flex flex-row rounded-lg border border-gray-300 px-4 pt-2 pb-4'>
      <div>
        <Checkbox
          disabled={
            !kandidat.arenaKandidatnr ||
            alleredeLagtTil?.some((k) => k === kandidat.arenaKandidatnr)
          }
          checked={
            erMarkert ||
            alleredeLagtTil?.some((k) => k === kandidat.arenaKandidatnr)
          }
          aria-selected={erMarkert}
          hideLabel
          className='mr-4'
          value='1'
          onChange={() =>
            kandidat.arenaKandidatnr && setMarkert(kandidat.arenaKandidatnr)
          }
        >
          Checkbox
        </Checkbox>
      </div>
      <div className='mt-2 flex-grow'>
        <Heading className='underline' size='small'>
          <Link href={`/kandidat/${kandidat.arenaKandidatnr}`}>
            {hentKandidatensNavn(kandidat)}
          </Link>
        </Heading>
        <div className='items-row flex'>
          <div className='w-full'>
            <div className='mt-2 flex flex-row gap-4'>
              <TekstMedIkon
                ikon={<PinIcon />}
                tekst={hentKandidatensØnskedeSteder(kandidat) ?? '-'}
              />

              <TekstMedIkon
                ikon={<HouseIcon />}
                tekst={`${kandidat.postnummer ?? '-'} ${kandidat.kommuneNavn ?? '-'}`}
              />
            </div>
            <div className='mt-2 flex flex-row gap-4'>
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
      {!stillingsId && (
        <div className='flex-end mr-4 flex flex-col justify-center gap-2 font-bold'>
          <Link
            href={`/kandidat/${kandidat.arenaKandidatnr}?visFane=forslagTilStilling`}
          >
            <TekstMedIkon ikon={<FileSearchIcon />} tekst='Finn stilling' />
          </Link>
        </div>
      )}
    </div>
  );
};

export default KandidatKort;
