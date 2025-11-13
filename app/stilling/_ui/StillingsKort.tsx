import { RekrutteringsbistandStillingSchemaDTO } from '@/app/api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import StillingsTag from '@/app/stilling/_ui/StillingsTag';
import { visStillingsDataInfo } from '@/app/stilling/_util/stillingInfoUtil';
import { hentArbeidssted } from '@/app/stilling/_util/stillingssøk-util';
import ListeKort from '@/components/layout/ListeKort';
import WindowAnker from '@/components/window/WindowAnker';
// import TekstMedIkon from '@/components/felles/TekstMedIkon';
// import { formaterNorskDato } from '@/util/util';
import ArbeidsplassenLogo from '@/public/arbeidsplassen.png';
import NavLogo from '@/public/nav.svg';
import formaterMedStoreOgSmåBokstaver from '@/util/tekst';
import {
  BriefcaseIcon,
  Buildings2Icon,
  // PersonIcon,
  PinIcon,
} from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';
import Image from 'next/image';
import { FC, MouseEvent } from 'react';

export interface IStillingsKort {
  stillingData: RekrutteringsbistandStillingSchemaDTO;
  kandidatId?: string;
}

const StillingsKort: FC<IStillingsKort> = ({ stillingData, kandidatId }) => {
  const stillingsDataInfo = visStillingsDataInfo(stillingData);
  const stopAllPropagation = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
  };
  const erFormidling = stillingsDataInfo.erFormidling;
  const erDirektemeldt = stillingsDataInfo.erDirektemeldt;

  const getWindowRefWithParams = () => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('visStillingId', stillingData.stilling.uuid);

    const basePath = kandidatId
      ? `/kandidat/${kandidatId}/finn-stilling`
      : erFormidling
        ? `/etterregistrering`
        : `/stilling`;

    return `${basePath}?${currentParams.toString()}`;
  };

  return (
    <WindowAnker
      windowRef={getWindowRefWithParams()}
      href={
        kandidatId
          ? `/kandidat/${kandidatId}/finn-stilling/${stillingData.stilling.uuid}`
          : erFormidling
            ? `/etterregistrering/${stillingData.stilling.uuid}`
            : `/stilling/${stillingData.stilling.uuid}`
      }
    >
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
              // <BriefcaseIcon aria-hidden />
              <Image width={'26'} height={'26'} alt='intern' src={NavLogo} />
            ) : (
              <Image
                width={'26'}
                height={'26'}
                alt='arbeidsplassen.no'
                src={ArbeidsplassenLogo}
              />
            )}
          </div>
          {/* Innhold */}
          <div className={`min-w-0 flex-1`}>
            {/* Tittel + tag */}
            <div className='flex min-w-0 items-start gap-2'>
              <Heading
                size='small'
                className='inline-flex min-w-0 flex-1 items-center gap-1 pr-2'
                title={stillingData?.stilling?.tittel || 'Ukjent tittel'}
              >
                <span className='min-w-0 truncate'>
                  {stillingData?.stilling?.tittel || 'Ukjent tittel'}
                </span>
              </Heading>

              <div className='flex-shrink-0'>
                <StillingsTag stillingsData={stillingData} />
              </div>
            </div>
            {/* Info + knapper */}
            <div className='flex min-w-0 items-start gap-2'>
              <div className='text-text-subtle flex min-w-0 flex-1 flex-wrap gap-x-4 gap-y-1 text-sm'>
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
                  <PinIcon aria-hidden className='text-text-subtle' />
                  {formaterMedStoreOgSmåBokstaver(
                    hentArbeidssted(stillingData.stilling.locations),
                  ) || '-'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </ListeKort>
    </WindowAnker>
  );
};

export default StillingsKort;
