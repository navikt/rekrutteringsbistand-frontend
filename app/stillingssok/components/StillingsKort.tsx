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
import { Stillingskategori } from '../../../types/stilling/kategorier';
import {
  konverterTilPresenterbarDato,
  visDatoMedMåned,
} from '../../../util/dato';
import formaterMedStoreOgSmåBokstaver from '../../../util/tekst';
import { StillingsDTO } from '../types';
import { formaterEiernavn, hentArbeidssted, hentEier } from '../util';
import StillingsTag from './StillingsTag';

export interface IStillingsKort {
  stillingData: StillingsDTO;
}

const StillingsKort: React.FC<IStillingsKort> = ({ stillingData }) => {
  const publisertDato = visDatoMedMåned(
    new Date(stillingData.stilling.published),
  );
  const utløpsDato = visDatoMedMåned(new Date(stillingData.stilling.expires));
  const antallStillinger = Number(
    stillingData.stilling.properties.positioncount,
  );
  const antallStillingerSuffix =
    antallStillinger === 1 ? ` stilling` : ` stillinger`;
  const eierNavn = formaterEiernavn(hentEier(stillingData));

  return (
    <Box className='border rounded-lg mb-4 border-gray-300 p-4'>
      <div className='mb-2 text-sm '>
        <p>
          {stillingData.stilling.publishedByAdmin
            ? publisertDato !== utløpsDato
              ? `${publisertDato} -
                ${utløpsDato}`
              : `Publisert ${publisertDato}`
            : null}
        </p>
      </div>
      <div className='mb-4'>
        <StillingsTag
          erEier={true}
          erUtløpt={true}
          erIkkePublisert={true}
          erUtkast={true}
          erStoppet={true}
          arbeidsplassen={true}
          direktemeldt={true}
          registrertMedInkluderingsmulighet={true}
          erJobbmesse={
            stillingData?.stillingsinfo?.stillingskategori ===
            Stillingskategori.Jobbmesse
          }
          erSlettet={true}
        />
      </div>
      <div className='flex'>
        <Buildings2Icon />
        <span className='ml-2'>
          {stillingData.stilling?.businessName || 'Ukjent bedrift'}
        </span>
      </div>
      <Link href={`/stilling/${stillingData.stilling.uuid}`}>
        <Heading size='small'>
          {stillingData?.stilling?.title || 'Ukjent tittel'}
        </Heading>
      </Link>
      <div className='flex mt-4'>
        <div title='Lokasjon' className='flex items-center mr-4'>
          <PinIcon />
          <p className='ml-2'>
            {formaterMedStoreOgSmåBokstaver(
              hentArbeidssted(stillingData.stilling.locations),
            ) || '-'}
          </p>
        </div>
        <div title='Antall stillinger' className='flex items-center mr-4'>
          <BriefcaseIcon />
          <p className='ml-2'>
            {antallStillinger
              ? `${antallStillinger} ${antallStillingerSuffix}`
              : '-'}
          </p>
        </div>
        <div title='Lokasjon' className='flex items-center mr-4'>
          <ClockIcon />
          <p className='ml-2'>
            {stillingData.stilling.properties.applicationdue
              ? konverterTilPresenterbarDato(
                  stillingData.stilling.properties.applicationdue,
                )
              : '-'}
          </p>
        </div>
        <div title='Eier' className='flex items-center mr-4'>
          <PersonIcon />
          <p className='ml-2'>{eierNavn}</p>
        </div>
      </div>
    </Box>
  );
};

export default StillingsKort;
