import formaterMedStoreOgSmåBokstaver from '../../../util/tekst';
import { UmamiEvent } from '../../../util/umamiEvents';
import { leggTilKandidater } from '../../api/kandidat-sok/leggTilKandidat';
import { RekrutteringsbistandStillingSchemaDTO } from '../../api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import TekstMedIkon from '../../components/TekstMedIkon';
import { useVisVarsling } from '../../components/varsling/Varsling';
import { useApplikasjonContext } from '../../providers/ApplikasjonContext';
import { useUmami } from '../../providers/UmamiContext';
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
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
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

  const { track } = useUmami();
  const visVarsel = useVisVarsling();
  const antallStillinger = Number(
    stillingData?.stilling?.properties?.positioncount,
  );
  const antallStillingerSuffix =
    antallStillinger === 1 ? ` stilling` : ` stillinger`;

  const eierNavn = formaterEiernavn(hentEierFraStilling(stillingData));
  const erEier = hentIdentFraStilling(stillingData) === ident;

  const erFormidling =
    stillingData.stillingsinfo?.stillingskategori === 'FORMIDLING';

  function parseNorskDato(dateString: string | undefined | null) {
    if (!dateString) return null;

    try {
      const parsedDate = new Date(dateString);
      return isNaN(parsedDate.getTime()) ? null : parsedDate;
    } catch {
      return null;
    }
  }

  const stillingUrl = `${erFormidling ? '/etterregistrering/' : '/stilling/'}${stillingData.stilling.uuid}`;

  const leggTilKandidat = async (kandidatId: string) => {
    track(UmamiEvent.Stilling.forslag_til_stilling_legg_til_kandidat);
    try {
      await leggTilKandidater([kandidatId], stillingData.stilling.uuid);
      visVarsel({
        innhold: 'Kandidat er lagt til i kandidatliste',
        alertType: 'success',
      });
    } catch {
      visVarsel({
        innhold: 'Kandidat kunne ikke legges til i kandidatliste',
        alertType: 'error',
      });
    }
  };

  const Knapper = (
    <>
      {kandidatId ? (
        <Button
          variant='tertiary'
          onClick={() => leggTilKandidat(kandidatId)}
          className='self-start sm:self-center'
        >
          Legg til kandidat
        </Button>
      ) : (
        <div className='flex flex-col sm:flex-row whitespace-nowrap gap-2'>
          {erEier && (
            <Link
              className='w-full sm:w-auto'
              href={`/stilling/${stillingData.stilling.uuid}?visFane=kandidater`}
            >
              <Button
                className='w-full sm:w-auto whitespace-nowrap'
                variant='tertiary'
              >
                Vis kandidater
              </Button>
            </Link>
          )}
          <Link
            className='w-full sm:w-auto'
            href={`/stilling/${stillingData.stilling.uuid}/finn-kandidater`}
          >
            <Button
              className='w-full sm:w-auto whitespace-nowrap'
              variant='tertiary'
            >
              Finn kandidater
            </Button>
          </Link>
        </div>
      )}
    </>
  );

  return (
    <Box.New
      padding='4'
      className='mb-4'
      background='neutral-softA'
      borderRadius='xlarge'
      data-testid='stillings-kort'
    >
      <>
        <StillingsTag splitTags stillingsData={stillingData} />
      </>
      <Box className='mb-2'>
        <Link
          href={
            kandidatId ? `${stillingUrl}/kandidat/${kandidatId}` : stillingUrl
          }
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

      <div className='mt-4 flex justify-between flex-col sm:flex-row gap-4 sm:gap-2'>
        <div className='flex flex-col sm:flex-row flex-wrap gap-4'>
          <TekstMedIkon
            className='sm:mr-4'
            title='Lokasjon'
            tekst={
              formaterMedStoreOgSmåBokstaver(
                hentArbeidssted(stillingData.stilling.locations),
              ) || '-'
            }
          />
          <TekstMedIkon
            className='sm:mr-4'
            ikon={<BriefcaseIcon />}
            title='Antall stillinger'
            tekst={
              antallStillinger
                ? `${antallStillinger} ${antallStillingerSuffix}`
                : '-'
            }
          />
          <TekstMedIkon
            className='sm:mr-4'
            ikon={<ClockIcon />}
            title='Frist'
            tekst={` ${
              stillingData.stilling.properties?.applicationdue
                ? (() => {
                    const parsedDate = parseNorskDato(
                      stillingData.stilling?.properties?.applicationdue,
                    );
                    return parsedDate
                      ? format(parsedDate, 'd. MMMM yyyy', {
                          locale: nb,
                        })
                      : stillingData.stilling.properties.applicationdue;
                  })()
                : '-'
            }`}
          />
          <TekstMedIkon
            className='sm:mr-4'
            ikon={<PersonIcon />}
            title='Eier'
            tekst={eierNavn}
          />
        </div>
        <div className='hidden xl:block'>{Knapper}</div>
      </div>
      <div className='xl:hidden flex justify-end'>{Knapper}</div>
    </Box.New>
  );
};

export default StillingsKort;
