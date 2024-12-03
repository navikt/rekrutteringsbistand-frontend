import {
  BriefcaseIcon,
  Buildings2Icon,
  ClockIcon,
  PersonIcon,
  PinIcon,
} from '@navikt/aksel-icons';
import { Box, Button, Heading } from '@navikt/ds-react';
import Link from 'next/link';
import * as React from 'react';

import { konverterTilPresenterbarDato } from '../../../util/dato';
import formaterMedStoreOgSmåBokstaver from '../../../util/tekst';
import TekstMedIkon from '../../components/TekstMedIkon';

import { RekrutteringsbistandStillingSchemaDTO } from '../../api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import { useApplikasjonContext } from '../../ApplikasjonContext';
import {
  formaterEiernavn,
  hentArbeidssted,
  hentEierFraStilling,
  hentIdentFraStilling,
} from '../stillingssøk-util';
import StillingsTag from './StillingsTag';

export interface IStillingsKort {
  stillingData: RekrutteringsbistandStillingSchemaDTO;
  kandidatId?: string;
}

const StillingsKort: React.FC<IStillingsKort> = ({
  stillingData,
  kandidatId,
}) => {
  const {
    brukerData: { ident },
  } = useApplikasjonContext();
  const antallStillinger = Number(
    stillingData?.stilling?.properties?.positioncount,
  );
  const antallStillingerSuffix =
    antallStillinger === 1 ? ` stilling` : ` stillinger`;

  const eierNavn = formaterEiernavn(hentEierFraStilling(stillingData));
  const erEier = hentIdentFraStilling(stillingData) === ident;

  return (
    <Box className='border rounded-lg mb-4 border-gray-300 p-4'>
      <>
        <StillingsTag splitTags stillingsData={stillingData} />
      </>
      <Box className='mb-2'>
        <Link href={`/stilling/${stillingData.stilling.uuid}`}>
          <Heading size='small'>
            {stillingData?.stilling?.tittel || 'Ukjent tittel'}
          </Heading>
        </Link>
      </Box>

      <TekstMedIkon
        ikon={<Buildings2Icon />}
        tekst={stillingData.stilling?.businessName || 'Ukjent bedrift'}
      />

      <div className='flex mt-4 justify-between'>
        <div className='flex'>
          <TekstMedIkon
            className='mr-4'
            ikon={<PinIcon />}
            title='Lokasjon'
            tekst={
              formaterMedStoreOgSmåBokstaver(
                hentArbeidssted(stillingData.stilling.locations),
              ) || '-'
            }
          />

          <TekstMedIkon
            className='mr-4'
            ikon={<BriefcaseIcon />}
            title='Antall stillinger'
            tekst={
              antallStillinger
                ? `${antallStillinger} ${antallStillingerSuffix}`
                : '-'
            }
          />

          <TekstMedIkon
            className='mr-4'
            ikon={<ClockIcon />}
            title='Lokasjon'
            tekst={
              stillingData.stilling.properties?.applicationdue
                ? konverterTilPresenterbarDato(
                    typeof stillingData.stilling.properties.applicationdue ===
                      'string'
                      ? stillingData.stilling.properties.applicationdue
                      : undefined,
                  )
                : '-'
            }
          />

          <TekstMedIkon
            className='mr-4'
            ikon={<PersonIcon />}
            title='Eier'
            tekst={eierNavn}
          />
        </div>
        {!kandidatId && (
          <div>
            {erEier && (
              <Link
                href={`/stilling/${stillingData.stilling.uuid}?visFane=kandidater`}
              >
                <Button variant='tertiary'>Vis kandidater</Button>
              </Link>
            )}
            <Link href={`/kandidat-sok/stilling/${stillingData.stilling.uuid}`}>
              <Button variant='tertiary'>Finn kandidater</Button>
            </Link>
          </div>
        )}
      </div>
    </Box>
  );
};

export default StillingsKort;
