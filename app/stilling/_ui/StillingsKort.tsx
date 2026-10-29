import { RekrutteringsbistandStillingSchemaDTO } from '@/app/api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import {
  datostrengTilDato,
  formaterDatoUtskrevetMåned,
} from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import StillingsTag from '@/app/stilling/_ui/StillingsTag';
import { visStillingsDataInfo } from '@/app/stilling/_util/stillingInfoUtil';
import { hentArbeidssted } from '@/app/stilling/_util/stillingssøk-util';
import ListeKort from '@/components/layout/ListeKort';
import AntallJobbsøkere from '@/components/stilling/AntallJobbsøkere';
import IkonNavnAvatar from '@/components/ui/IkonNavnAvatar';
import WindowAnker, {
  useWindowAnkerVisited,
} from '@/components/window/WindowAnker';
import {
  etterregistreringAnker,
  finnStillingForKandidatAnker,
  stillingsAnker,
} from '@/components/window/ankerLenker';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
// import TekstMedIkon from '@/components/felles/TekstMedIkon';
// import { formaterNorskDato } from '@/util/util';
import ArbeidsplassenLogo from '@/public/arbeidsplassen.png';
import NavLogo from '@/public/nav.svg';
import formaterMedStoreOgSmåBokstaver from '@/util/tekst';
import {
  BriefcaseIcon,
  Buildings2Icon,
  CalendarIcon,
  // PersonIcon,
  LocationPinIcon,
  ShieldCheckmarkIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Box, Detail, Heading } from '@navikt/ds-react';
import { differenceInCalendarDays } from 'date-fns';
import Image from 'next/image';
import { FC, MouseEvent } from 'react';

export interface IStillingsKort {
  stillingData: RekrutteringsbistandStillingSchemaDTO;
  kandidatId?: string;
}

type StillingsDataInfo = ReturnType<typeof visStillingsDataInfo>;
type Anker = { href: string; windowRef: string };

const StillingsTittel = ({ tittel }: { tittel: string }) => {
  const erBesokt = useWindowAnkerVisited();
  return (
    <span className={erBesokt ? 'text-text-subtle font-normal' : undefined}>
      {tittel}
    </span>
  );
};

const StillingsKortInnhold = ({
  stillingData,
  stillingsDataInfo,
  anker,
}: {
  stillingData: RekrutteringsbistandStillingSchemaDTO;
  stillingsDataInfo: StillingsDataInfo;
  anker: Anker;
}) => {
  const tittel = stillingData?.stilling?.tittel || 'Ukjent tittel';
  const stopAllPropagation = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
  };
  const erDirektemeldt = stillingsDataInfo.erDirektemeldt;

  const publisertDatoStreng = stillingData.stilling.published;
  const publisertDato = datostrengTilDato(publisertDatoStreng);
  const antallDagerSidenPublisert = publisertDato
    ? differenceInCalendarDays(new Date(), publisertDato)
    : null;

  const erEier =
    useApplikasjonContext().brukerData.ident ===
    stillingData.stillingsinfo?.eierNavident;
  const eierNavn = stillingData.stillingsinfo?.eierNavn;
  const eierTag = () => {
    if (erEier) {
      return (
        <Box
          className='flex w-fit items-center gap-1 px-1 py-0.5'
          background={'neutral-moderateA'}
          borderRadius={'2'}
        >
          <ShieldCheckmarkIcon
            aria-hidden
            className={'shrink-0'}
            fontSize={'1rem'}
          />
          <BodyShort className={'text-sm'}>Mitt oppdrag</BodyShort>
        </Box>
      );
    } else if (eierNavn) {
      return (
        <Box className={'flex w-fit items-center gap-1'}>
          <IkonNavnAvatar
            fulltNavn={eierNavn}
            farge={'grå'}
            kantfarge
            størrelse={'sm'}
          ></IkonNavnAvatar>
          <Detail textColor={'subtle'}>Eies av {eierNavn}</Detail>
        </Box>
      );
    }
  };

  return (
    <ListeKort>
      <div
        className='pointer-events-none z-10 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100'
        onClick={stopAllPropagation}
        onMouseDown={stopAllPropagation}
        onPointerDown={stopAllPropagation}
      ></div>
      <div className='flex min-w-0 items-start'>
        <div className='pr-4'>
          {erDirektemeldt ? (
            <Image
              width={'26'}
              height={'26'}
              alt='Stilling registrert av Nav'
              src={NavLogo}
            />
          ) : (
            <Image
              width={'26'}
              height={'26'}
              alt='Stilling hentet fra arbeidsplassen.no'
              src={ArbeidsplassenLogo}
            />
          )}
        </div>
        {/* Innhold */}
        <div className='min-w-0 flex-1'>
          {/* Tittel + tag */}
          <div className='mb-2 flex min-w-0 flex-wrap items-center justify-between gap-2'>
            <Heading
              size='small'
              level='2'
              className='min-w-0 shrink'
              title={tittel}
            >
              <WindowAnker
                stretchet
                windowRef={anker.windowRef}
                href={anker.href}
              >
                <StillingsTittel tittel={tittel} />
              </WindowAnker>
            </Heading>

            <StillingsTag stillingsData={stillingData} />
          </div>
          {/* Info + knapper */}
          <div className='text-text-subtle @container min-w-0 flex-1 text-sm'>
            <div className='grid grid-cols-1 gap-x-4 gap-y-2 @xs:grid-cols-[repeat(2,minmax(0,max-content))] @md:grid-cols-[repeat(3,minmax(0,max-content))] @md:gap-y-4'>
              <span className='flex items-center gap-1'>
                <Buildings2Icon aria-hidden className='text-text-subtle' />
                {stillingData.stilling?.businessName || 'Ukjent bedrift'}
              </span>
              <span className='flex items-center gap-1'>
                <BriefcaseIcon aria-hidden className='text-text-subtle' />
                {[
                  stillingData.stilling.properties?.engagementtype,
                  stillingData.stilling.properties?.extent,
                ]
                  .filter(Boolean)
                  .join(', ') || '-'}
              </span>
              <span className='flex items-center gap-1'>
                <LocationPinIcon aria-hidden className='text-text-subtle' />
                {formaterMedStoreOgSmåBokstaver(
                  hentArbeidssted(stillingData.stilling.locations),
                ) || '-'}
              </span>
              {eierTag()}
              <AntallJobbsøkere
                antall={stillingData.kandidatlisteInfo?.antallKandidater}
              />
              {antallDagerSidenPublisert !== null && (
                <span className='flex items-center gap-1'>
                  <CalendarIcon aria-hidden className='text-text-subtle' />
                  Publisert{' '}
                  {antallDagerSidenPublisert === 0
                    ? 'i dag'
                    : `for ${antallDagerSidenPublisert}
                ${antallDagerSidenPublisert === 1 ? 'dag' : 'dager'} siden`}{' '}
                  ({formaterDatoUtskrevetMåned(publisertDatoStreng)})
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </ListeKort>
  );
};

const StillingsKort: FC<IStillingsKort> = ({ stillingData, kandidatId }) => {
  const stillingsDataInfo = visStillingsDataInfo(stillingData);
  const erFormidling = stillingsDataInfo.erFormidling;
  const stillingsId = stillingData.stilling.uuid;

  const anker = kandidatId
    ? finnStillingForKandidatAnker(kandidatId, stillingsId)
    : erFormidling
      ? etterregistreringAnker(stillingsId)
      : stillingsAnker(stillingsId);

  return (
    <StillingsKortInnhold
      stillingData={stillingData}
      stillingsDataInfo={stillingsDataInfo}
      anker={anker}
    />
  );
};

export default StillingsKort;
