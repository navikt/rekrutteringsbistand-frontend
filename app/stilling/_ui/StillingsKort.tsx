import { RekrutteringsbistandStillingSchemaDTO } from '@/app/api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import StillingsTag from '@/app/stilling/_ui/StillingsTag';
import { visStillingsDataInfo } from '@/app/stilling/_util/stillingInfoUtil';
import { hentArbeidssted } from '@/app/stilling/_util/stillingssøk-util';
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
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { FC } from 'react';

export interface IStillingsKort {
  stillingData: RekrutteringsbistandStillingSchemaDTO;
}

const StillingsKort: FC<IStillingsKort> = ({ stillingData }) => {
  // const { visVarsel } = useApplikasjonContext();

  const router = useRouter();
  // const { track } = useUmami();
  const [, setVisStillingId] = useQueryState('visStillingId', {
    defaultValue: '',
    clearOnDefault: true,
  });
  const [, setVisEtterregistreringId] = useQueryState(
    'visEtterregistreringId',
    {
      defaultValue: '',
      clearOnDefault: true,
    },
  );

  // const [leggerTilKandidatLoading, setLeggerTilKandidatLoading] =
  //   useState(false);

  const stillingsDataInfo = visStillingsDataInfo(stillingData);

  const erFormidling = stillingsDataInfo.erFormidling;
  const erDirektemeldt = stillingsDataInfo.erDirektemeldt;

  // const leggTilKandidat = async (kandidatId: string) => {
  //   track(UmamiEvent.Stilling.forslag_til_stilling_legg_til_kandidat);
  //   setLeggerTilKandidatLoading(true);
  //   try {
  //     await leggTilKandidater([kandidatId], stillingData.stilling.uuid);
  //     visVarsel({
  //       tekst: 'Kandidat er lagt til i kandidatliste',
  //       type: 'success',
  //     });
  //   } catch {
  //     visVarsel({
  //       tekst: 'Kandidat kunne ikke legges til i kandidatliste',
  //       type: 'error',
  //     });
  //   } finally {
  //     setLeggerTilKandidatLoading(false);
  //   }
  // };

  // const Knapper = (
  //   <div className='flex flex-row gap-2 items-center'>
  //     {kandidatId ? (
  //       erDirektemeldt ? (
  //         <Button
  //           loading={leggerTilKandidatLoading}
  //           size='small'
  //           variant='tertiary'
  //           onClick={(e) => {
  //             e.stopPropagation();
  //             leggTilKandidat(kandidatId);
  //           }}
  //           className='whitespace-nowrap'
  //         >
  //           Legg til kandidat
  //         </Button>
  //       ) : (
  //         <Button
  //           size='small'
  //           variant='tertiary'
  //           onClick={(e) => {
  //             e.stopPropagation();
  //             router.push(stillingUrl);
  //           }}
  //           className='whitespace-nowrap'
  //         >
  //           Vis stilling
  //         </Button>
  //       )
  //     ) : (
  //       <Button
  //         size='small'
  //         variant='tertiary'
  //         className='whitespace-nowrap'
  //         onClick={(e) => {
  //           e.stopPropagation();
  //           router.push(stillingUrl);
  //         }}
  //       >
  //         {erFormidling ? 'Vis etterregistrering' : 'Vis stilling'}
  //       </Button>
  //     )}
  //   </div>
  // );

  return (
    <Box.New
      padding='4'
      className={`group ${erFormidling ? '' : 'cursor-pointer '}`}
      background='neutral-softA'
      borderRadius='xlarge'
      data-testid='stillings-kort'
      // onClick={(e) => {
      // erFormidling
      // ? setVisEtterregistreringId(stillingData.stilling.uuid)
      // : setVisStillingId(stillingData.stilling.uuid)
      // }}
    >
      <a
        href={
          erFormidling
            ? `/etterregistrering/${stillingData.stilling.uuid}`
            : `/stilling/${stillingData.stilling.uuid}`
        }
      >
        <div className='flex  items-start min-w-0'>
          {/* Ikon / avatar */}
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
          <div className='flex-1 min-w-0'>
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
        </div>
      </a>
    </Box.New>
  );
};

export default StillingsKort;
