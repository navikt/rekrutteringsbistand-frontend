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
import { eierStilling } from '../../../components/tilgangskontroll/erEier';
import {
  konverterTilPresenterbarDato,
  visDatoMedMåned,
} from '../../../util/dato';
import formaterMedStoreOgSmåBokstaver from '../../../util/tekst';
import { useApplikasjonContext } from '../../ApplikasjonContext';
import { Status, Stillingskategori } from '../../stilling/stilling-typer';
import { stillingErUtløpt } from '../../stilling/stilling-util';
import { StillingsDTO } from '../stillingssøk-typer';
import {
  formaterEiernavn,
  hentArbeidssted,
  hentEier,
} from '../stillingssøk-util';
import { Hovedtag } from './StillingsSøkFilter/InkluderingFilter';
import StillingsTag from './StillingsTag';

export interface IStillingsKort {
  stillingData: StillingsDTO;
}

const hentHovedtags = (): string[] => {
  return Object.values(Hovedtag);
};

const StillingsKort: React.FC<IStillingsKort> = ({ stillingData }) => {
  const { navIdent } = useApplikasjonContext();
  const erEier = eierStilling({
    stillingsData: stillingData,
    navIdent: navIdent,
  });

  const publisertDato = visDatoMedMåned(
    new Date(stillingData.stilling.published),
  );
  const utløpsDato = visDatoMedMåned(new Date(stillingData.stilling.expires));
  const antallStillinger = Number(
    stillingData?.stilling?.properties?.positioncount,
  );
  const antallStillingerSuffix =
    antallStillinger === 1 ? ` stilling` : ` stillinger`;
  const eierNavn = formaterEiernavn(hentEier(stillingData));
  const erUtløptStilling = stillingErUtløpt(stillingData.stilling);
  const status = stillingData.stilling.status;

  const erIkkePublisert =
    stillingData.stilling.publishedByAdmin &&
    status === Status.Inaktiv &&
    !erUtløptStilling;

  return (
    <Box className='border rounded-lg mb-4 border-gray-300 p-4'>
      <div>
        <StillingsTag
          publisert={
            stillingData.stilling.publishedByAdmin
              ? publisertDato !== utløpsDato
                ? `${publisertDato} -
            ${utløpsDato}`
                : `Publisert ${publisertDato}`
              : '-'
          }
          arbeidsplassen={stillingData?.stilling?.privacy === 'SHOW_ALL'}
          direktemeldt={stillingData?.stillingsinfo?.source === 'DIR'}
          erEier={erEier}
          erIkkePublisert={erIkkePublisert ? true : false}
          erJobbmesse={
            stillingData?.stillingsinfo?.stillingskategori ===
            Stillingskategori.Jobbmesse
          }
          erSlettet={status === Status.Slettet}
          erStoppet={status === Status.Stoppet || status === Status.Avslått}
          erUtkast={!stillingData.stilling.publishedByAdmin}
          erUtløpt={
            !!stillingData.stilling.publishedByAdmin &&
            status === Status.Inaktiv &&
            !erUtløptStilling
          }
          registrertMedInkluderingsmulighet={stillingData.stilling.properties?.tags?.some(
            (tag: any) => hentHovedtags().includes(tag),
          )}
        />
      </div>
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
