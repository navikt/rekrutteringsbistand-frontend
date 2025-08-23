import StillingsTag from './StillingsTag';
import { leggTilKandidater } from '@/app/api/kandidat-sok/leggTilKandidat';
import { RekrutteringsbistandStillingSchemaDTO } from '@/app/api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import { visStillingsDataInfo } from '@/app/stilling/stillingInfoUtil';
import {
  formaterEiernavn,
  hentArbeidssted,
  hentEierFraStilling,
  hentIdentFraStilling,
} from '@/app/stilling/stillingssøk-util';
import TekstMedIkon from '@/components/felles/TekstMedIkon';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import formaterMedStoreOgSmåBokstaver from '@/util/tekst';
import { formaterNorskDato } from '@/util/util';
import {
  BriefcaseIcon,
  Buildings2Icon,
  ClockIcon,
  PersonIcon,
} from '@navikt/aksel-icons';
import { Box, Button, Heading, Link } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
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
    visVarsel,
    brukerData: { ident },
  } = useApplikasjonContext();

  const router = useRouter();
  const { track } = useUmami();

  const [leggerTilKandidatLoading, setLeggerTilKandidatLoading] =
    React.useState(false);

  const antallStillinger = Number(
    stillingData?.stilling?.properties?.positioncount,
  );
  const antallStillingerSuffix =
    antallStillinger === 1 ? ` stilling` : ` stillinger`;

  const stillingsDataInfo = visStillingsDataInfo(stillingData);

  const eierNavn = formaterEiernavn(hentEierFraStilling(stillingData));
  const erEier = hentIdentFraStilling(stillingData) === ident;

  const erFormidling = stillingsDataInfo.erFormidling;
  const erDirektemeldt = stillingsDataInfo.erDirektemeldt;

  const stillingUrl = `${erFormidling ? '/etterregistrering/' : '/stilling/'}${stillingData.stilling.uuid}`;

  const leggTilKandidat = async (kandidatId: string) => {
    track(UmamiEvent.Stilling.forslag_til_stilling_legg_til_kandidat);
    setLeggerTilKandidatLoading(true);
    try {
      await leggTilKandidater([kandidatId], stillingData.stilling.uuid);
      visVarsel({
        tekst: 'Kandidat er lagt til i kandidatliste',
        type: 'success',
      });
    } catch {
      visVarsel({
        tekst: 'Kandidat kunne ikke legges til i kandidatliste',
        type: 'error',
      });
    } finally {
      setLeggerTilKandidatLoading(false);
    }
  };

  const Knapper = (
    <>
      {kandidatId ? (
        erDirektemeldt ? (
          <Button
            loading={leggerTilKandidatLoading}
            variant='tertiary'
            onClick={() => leggTilKandidat(kandidatId)}
            className='self-start sm:self-center whitespace-nowrap'
          >
            Legg til kandidat
          </Button>
        ) : (
          <Button
            variant='tertiary'
            onClick={() => router.push(stillingUrl)}
            className='self-start sm:self-center whitespace-nowrap'
          >
            Vis stilling
          </Button>
        )
      ) : (
        <div className='flex flex-col sm:flex-row whitespace-nowrap gap-2'>
          {erEier && (
            <Link
              className='w-full sm:w-auto'
              href={`/stilling/${stillingData.stilling.uuid}?stillingFane=kandidater`}
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
            kandidatId
              ? `${stillingUrl}?visKandidatnr=${kandidatId}`
              : stillingUrl
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
                ? formaterNorskDato({
                    dato: stillingData.stilling.properties.applicationdue,
                  })
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
