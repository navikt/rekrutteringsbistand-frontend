import { RekrutteringsbistandStillingSchemaDTO } from '@/app/api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import StillingsTag from '@/app/stilling/_ui/StillingsTag';
import { visStillingsDataInfo } from '@/app/stilling/_util/stillingInfoUtil';
import { hentArbeidssted } from '@/app/stilling/_util/stillingssøk-util';
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
import { Box, Heading } from '@navikt/ds-react';
import Image from 'next/image';
import { FC, MouseEvent } from 'react';

export interface IStillingsKort {
  stillingData: RekrutteringsbistandStillingSchemaDTO;
  kandidatId?: string;
}

const StillingsKort: FC<IStillingsKort> = ({ stillingData, kandidatId }) => {
  // const [, setVisStillingsId] = useQueryState('visStillingsId', {
  //   defaultValue: '',
  //   clearOnDefault: true,
  // });
  const stillingsDataInfo = visStillingsDataInfo(stillingData);
  const stopAllPropagation = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
  };
  const erFormidling = stillingsDataInfo.erFormidling;
  const erDirektemeldt = stillingsDataInfo.erDirektemeldt;

  return (
    <WindowAnker
      windowRef={
        erFormidling
          ? `/etterregistrering?visStillingId=${stillingData.stilling.uuid}`
          : `/stilling?visStillingId=${stillingData.stilling.uuid}`
      }
      href={
        kandidatId
          ? `/kandidat/${kandidatId}/finn-stilling/${stillingData.stilling.uuid}`
          : erFormidling
            ? `/etterregistrering/${stillingData.stilling.uuid}`
            : `/stilling/${stillingData.stilling.uuid}`
      }
    >
      <Box.New
        className={`group cursor-pointer`}
        background='neutral-softA'
        padding='5'
        borderRadius='xlarge'
        data-testid='stillings-kort'
        // onClick={() => setVisStillingsId(stillingData.stilling.uuid)}
      >
        <div
          className='opacity-0 transition-opacity
                   group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto z-10'
          onClick={stopAllPropagation}
          onMouseDown={stopAllPropagation}
          onPointerDown={stopAllPropagation}
        ></div>
        <div className='flex  items-start min-w-0'>
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
          <div className={`flex-1 min-w-0 `}>
            {/* Tittel + tag */}
            <div className='flex items-start gap-2 min-w-0'>
              <Heading
                size='small'
                className='flex-1 min-w-0 pr-2 inline-flex items-center gap-1'
                title={stillingData?.stilling?.tittel || 'Ukjent tittel'}
              >
                <span className='truncate min-w-0'>
                  {stillingData?.stilling?.tittel || 'Ukjent tittel'}
                </span>
              </Heading>

              <div className='flex-shrink-0'>
                <StillingsTag stillingsData={stillingData} />
              </div>
            </div>
            {/* Info + knapper */}
            <div className='flex gap-2 items-start min-w-0'>
              <div className='text-sm text-text-subtle flex flex-wrap gap-x-4 gap-y-1 flex-1 min-w-0'>
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
              {/* <div className='mt-3 flex justify-end flex-shrink-0'>
            
            </div> */}
            </div>
          </div>
        </div>
      </Box.New>
    </WindowAnker>
  );
};

export default StillingsKort;
