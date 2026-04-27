import { RekrutteringsbistandStillingSchemaDTO } from '@/app/api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import StillingsTag from '@/app/stilling/_ui/StillingsTag';
import { visStillingsDataInfo } from '@/app/stilling/_util/stillingInfoUtil';
import { hentArbeidssted } from '@/app/stilling/_util/stillingssøk-util';
import ListeKort from '@/components/layout/ListeKort';
import AntallJobbsøkere from '@/components/stilling/AntallJobbsøkere';
import WindowAnker, {
  useWindowAnkerVisited,
} from '@/components/window/WindowAnker';
import {
  etterregistreringAnker,
  finnStillingForKandidatAnker,
  stillingsAnker,
} from '@/components/window/ankerLenker';
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

type StillingsDataInfo = ReturnType<typeof visStillingsDataInfo>;
const StillingsKortInnhold = ({
  stillingData,
  stillingsDataInfo,
}: {
  stillingData: RekrutteringsbistandStillingSchemaDTO;
  stillingsDataInfo: StillingsDataInfo;
}) => {
  const erBesokt = useWindowAnkerVisited();
  const stopAllPropagation = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
  };
  const erDirektemeldt = stillingsDataInfo.erDirektemeldt;

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
        <div className='min-w-0 flex-1'>
          {/* Tittel + tag */}
          <div className='mb-2 flex min-w-0 flex-wrap items-center justify-between gap-2'>
            <Heading
              size='small'
              className={`min-w-0 shrink ${erBesokt ? 'text-text-subtle font-normal' : ''}`}
              title={stillingData?.stilling?.tittel || 'Ukjent tittel'}
            >
              {stillingData?.stilling?.tittel || 'Ukjent tittel'}
            </Heading>

            <StillingsTag stillingsData={stillingData} />
          </div>
          {/* Info + knapper */}
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
            <AntallJobbsøkere antall={undefined} />
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
    <WindowAnker windowRef={anker.windowRef} href={anker.href}>
      <StillingsKortInnhold
        stillingData={stillingData}
        stillingsDataInfo={stillingsDataInfo}
      />
    </WindowAnker>
  );
};

export default StillingsKort;
