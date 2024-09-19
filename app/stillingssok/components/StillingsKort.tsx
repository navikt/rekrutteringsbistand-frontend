import {
  BriefcaseIcon,
  Buildings2Icon,
  ClockIcon,
  PersonIcon,
  PinIcon,
} from '@navikt/aksel-icons';
import { Box, Heading } from '@navikt/ds-react';
import Link from 'next/link';
import * as React from 'react';

import TekstMedIkon from '../../../components/TekstMedIkon';
import { konverterTilPresenterbarDato } from '../../../util/dato';
import formaterMedStoreOgSmåBokstaver from '../../../util/tekst';
import { StillingsSøkStillingDTO } from '../stillingssøk-typer';
import {
  formaterEiernavn,
  hentArbeidssted,
  hentEier,
} from '../stillingssøk-util';
import StillingsTag from './StillingsTag';

export interface IStillingsKort {
  stillingData: StillingsSøkStillingDTO;
}

const StillingsKort: React.FC<IStillingsKort> = ({ stillingData }) => {
  const antallStillinger = Number(
    stillingData?.stilling?.properties?.positioncount,
  );
  const antallStillingerSuffix =
    antallStillinger === 1 ? ` stilling` : ` stillinger`;
  const eierNavn = formaterEiernavn(hentEier(stillingData));

  return (
    <Box className='border rounded-lg mb-4 border-gray-300 p-4'>
      <>
        <StillingsTag splitTags stillingsData={stillingData} />
      </>
      <TekstMedIkon
        ikon={<Buildings2Icon />}
        tekst={stillingData.stilling?.businessName || 'Ukjent bedrift'}
      />

      <Link href={`/stilling/${stillingData.stilling.uuid}`}>
        <Heading size='small'>
          {stillingData?.stilling?.title || 'Ukjent tittel'}
        </Heading>
      </Link>
      <div className='flex mt-4'>
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
                  stillingData.stilling.properties.applicationdue,
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
    </Box>
  );
};

export default StillingsKort;
