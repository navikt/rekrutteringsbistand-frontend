import { RekrutteringsbistandStillingSchemaDTO } from '@/app/api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import StillingsTag from '@/app/stilling/_ui/StillingsTag';
import { visStillingsDataInfo } from '@/app/stilling/_util/stillingInfoUtil';
import { hentArbeidssted } from '@/app/stilling/_util/stillingssøk-util';
import VisStillingModal from '@/components/modal/stilling/VisStillingModal';
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
import { FC, ReactNode, useState } from 'react';

export interface IStillingsKort {
  stillingData: RekrutteringsbistandStillingSchemaDTO;
  kandidatId?: string;
}

const StillingsKort: FC<IStillingsKort> = ({ stillingData, kandidatId }) => {
  const [visStillingModal, setVisStillingModal] = useState(false);

  const stillingsDataInfo = visStillingsDataInfo(stillingData);

  const erFormidling = stillingsDataInfo.erFormidling;
  const erDirektemeldt = stillingsDataInfo.erDirektemeldt;

  const ankerWrapper = (children: ReactNode) => {
    if (kandidatId) {
      return (
        <>
          {visStillingModal && (
            <VisStillingModal
              onClose={() => setVisStillingModal(false)}
              stillingsId={stillingData.stilling.uuid}
              kandidatId={kandidatId}
            />
          )}
          <div
            onClick={() => {
              if (kandidatId) {
                setVisStillingModal(true);
              }
            }}
            className='p-5 cursor-pointer'
          >
            {children}
          </div>
        </>
      );
    } else {
      return (
        <a
          href={
            erFormidling
              ? `/etterregistrering/${stillingData.stilling.uuid}`
              : `/stilling/${stillingData.stilling.uuid}`
          }
        >
          <div className='p-5'>{children}</div>
        </a>
      );
    }
  };

  return (
    <Box.New
      className={`group `}
      background='neutral-softA'
      borderRadius='xlarge'
      data-testid='stillings-kort'
    >
      {ankerWrapper(
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
                className='flex-1 min-w-0 truncate pr-2'
                title={stillingData?.stilling?.tittel || 'Ukjent tittel'}
              >
                {stillingData?.stilling?.tittel || 'Ukjent tittel'}
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
              {/* <div className='mt-3 flex justify-end flex-shrink-0'>{Knapper}</div> */}
            </div>
          </div>
        </div>,
      )}
    </Box.New>
  );
};

export default StillingsKort;
