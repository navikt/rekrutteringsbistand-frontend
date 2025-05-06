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
import { Box, Checkbox, Heading, Link } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
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
  const [, setVisKandidatnr] = useQueryState('visKandidatnr', {
    defaultValue: '',
    clearOnDefault: true,
  });
  const erMarkert = markerteKandidater?.some(
    (k) => k === kandidat.arenaKandidatnr,
  );

  const Knapp = (
    <div className='mt-2 flex justify-end self-end'>
      {!stillingsId && (
        <div className='flex-end flex flex-col justify-center gap-2 font-bold'>
          <Link href={`//stilling/?visKandidatnr=${kandidat.arenaKandidatnr}`}>
            <TekstMedIkon ikon={<FileSearchIcon />} tekst='Finn stilling' />
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <Box.New
      className='@container/kandidatlistekort mb-4 flex flex-col pl-4 pb-4 pr-4 min-w-fit'
      background='neutral-softA'
      borderRadius='xlarge'
      data-testid='stillings-kort'
    >
      <div className=' flex flex-row'>
        <div>
          <Checkbox
            disabled={
              !kandidat.arenaKandidatnr ||
              Boolean(
                alleredeLagtTil?.some((k) => k === kandidat.arenaKandidatnr),
              )
            }
            checked={
              Boolean(erMarkert) ||
              Boolean(
                alleredeLagtTil?.some((k) => k === kandidat.arenaKandidatnr),
              )
            }
            aria-selected={Boolean(erMarkert)}
            hideLabel
            className='mr-4'
            onChange={() =>
              kandidat.arenaKandidatnr && setMarkert(kandidat.arenaKandidatnr)
            }
          >
            Checkbox
          </Checkbox>
        </div>
        <div className='mt-2 flex-grow'>
          <Heading
            className='underline aksel-link aksel-link--action cursor-pointer'
            size='small'
          >
            <div
              onClick={() =>
                kandidat.arenaKandidatnr &&
                setVisKandidatnr(kandidat.arenaKandidatnr)
              }
            >
              {hentKandidatensNavn(kandidat)}
            </div>
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
                  tekst={`${kandidat.postnummer ?? '-'} ${kandidat.poststed ?? '-'} ${kandidat.kommuneNavn ? `(${kandidat.kommuneNavn})` : ''}`}
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
        <div className='hidden @xl/kandidatlistekort:block  flex-end self-end '>
          {Knapp}
        </div>
      </div>
      <div className=' @xl/kandidatlistekort:hidden flex justify-end'>
        {Knapp}
      </div>
    </Box.New>
  );
};

export default KandidatKort;
