import formaterMedStoreOgSmåBokstaver from '../../../util/tekst';
import { useApplikasjonContext } from '../../ApplikasjonContext';
import { RekrutteringsbistandStillingSchemaDTO } from '../../api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import TekstMedIkon from '../../components/TekstMedIkon';
import {
  formaterEiernavn,
  hentArbeidssted,
  hentEierFraStilling,
  hentIdentFraStilling,
} from '../stillingssøk-util';
import StillingsTag from './StillingsTag';
import {
  BriefcaseIcon,
  Buildings2Icon,
  ClockIcon,
  PersonIcon,
} from '@navikt/aksel-icons';
import { Box, Button, Heading, Link } from '@navikt/ds-react';
import * as React from 'react';

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

  const erFormidling =
    stillingData.stillingsinfo?.stillingskategori === 'FORMIDLING';

  return (
    <Box
      className='mb-4 rounded-lg border border-gray-300 p-4'
      data-testid='stillings-kort'
    >
      <>
        <StillingsTag splitTags stillingsData={stillingData} />
      </>
      <Box className='mb-2'>
        <Link
          href={`${erFormidling ? '/formidling/' : '/stilling/'}${stillingData.stilling.uuid}`}
        >
          <Heading size='small'>
            {stillingData?.stilling?.tittel || 'Ukjent tittel'}
          </Heading>
        </Link>
      </Box>

      <TekstMedIkon
        ikon={<Buildings2Icon />}
        tekst={stillingData.stilling?.businessName || 'Ukjent bedrift'}
      />

      <div className='mt-4 flex justify-between'>
        <div className='flex'>
          <TekstMedIkon
            className='mr-4'
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
            title='Frist'
            tekst={'TODO'}
            //   stillingData.stilling.properties?.applicationdue &&
            //   typeof stillingData.stilling.properties.applicationdue ===
            //     'string'
            //     ? stillingData.stilling.properties?.applicationdu === 'Snarest'
            //       ? 'Snarest'
            //       : format(
            //           new Date(stillingData.stilling.properties.applicationdue),
            //           'dd.MM.yyyy',
            //         )
            //     : '-'
            // }
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
            <Link
              href={`/stilling/${stillingData.stilling.uuid}?visFane=finn-kandidater`}
            >
              <Button variant='tertiary'>Finn kandidater</Button>
            </Link>
          </div>
        )}
      </div>
    </Box>
  );
};

export default StillingsKort;
