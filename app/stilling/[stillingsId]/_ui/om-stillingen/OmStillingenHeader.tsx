import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import KopierStillingLenke from '@/app/stilling/[stillingsId]/_ui/KopierStillingLenke';
import StillingPrint from '@/app/stilling/[stillingsId]/_ui/StillingPrint';
import StillingsTag from '@/app/stilling/_ui/StillingsTag';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import AntallJobbsøkere from '@/components/stilling/AntallJobbsøkere';
import IkonNavnAvatar from '@/components/ui/IkonNavnAvatar';
import { formaterNorskDato } from '@/util/dato';
import { hentNavkontorNavn } from '@/util/navkontorMapping';
import { Detail, Heading, Tooltip } from '@navikt/ds-react';
import { RefObject } from 'react';

export default function OmStillingenHeader({
  printRef,
}: {
  printRef: RefObject<HTMLDivElement | null>;
}) {
  const { stillingsData, kandidatlisteInfo } = useStillingsContext();

  const kanKopierePrinteStilling =
    stillingsData.stilling.status === StillingsStatus.Aktiv;

  const publisertDato = stillingsData.stilling.published
    ? formaterNorskDato({ dato: stillingsData.stilling.published })
    : '-';

  return (
    <div className='flex flex-wrap justify-between gap-4'>
      <div className='pb-5'>
        <Heading size='large'>{stillingsData.stilling.title ?? ''}</Heading>
        <Detail
          as='div'
          className={'flex flex-row flex-wrap items-center gap-1'}
        >
          <span className={'flex flex-row items-center gap-1'}>
            <Tooltip
              content={`Stillingen eies av ${stillingsData.stillingsinfo?.eierNavn ?? 'N A'}`}
            >
              <span className={'flex flex-row items-center gap-1'}>
                <IkonNavnAvatar
                  fulltNavn={stillingsData.stillingsinfo?.eierNavn ?? 'N A'}
                  størrelse={'sm'}
                  kantfarge
                  farge={'blå'}
                />
                {stillingsData.stillingsinfo?.eierNavn}
              </span>
            </Tooltip>
          </span>
          <span>{' • '}</span>
          Opprettet {publisertDato}
          <span>{' • '}</span>
          {hentNavkontorNavn(
            stillingsData.stillingsinfo?.eierNavKontorEnhetId,
          ) ?? ''}
          <StillingsTag stillingsData={stillingsData} />
          <AntallJobbsøkere antall={kandidatlisteInfo?.antallKandidater} />
        </Detail>
      </div>
      <div>
        {kanKopierePrinteStilling && (
          <>
            <KopierStillingLenke stillingsData={stillingsData} />
            <StillingPrint printRef={printRef} />
          </>
        )}
      </div>
    </div>
  );
}
