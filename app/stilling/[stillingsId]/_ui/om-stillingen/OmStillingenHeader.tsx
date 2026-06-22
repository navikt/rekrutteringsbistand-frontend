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

  const eierNavn = stillingsData.stillingsinfo?.eierNavn;
  const eierNavkontor = stillingsData.stillingsinfo?.eierNavKontorEnhetId;

  return (
    <div className='flex flex-wrap justify-between'>
      <div className='pb-5'>
        <Heading size='large'>{stillingsData.stilling.title ?? ''}</Heading>
        <Detail
          as='div'
          className={'flex flex-row flex-wrap items-center gap-1'}
        >
          {eierNavn && (
            <>
              <span className={'flex flex-row items-center gap-1'}>
                <Tooltip content={`Stillingen eies av ${eierNavn ?? 'N/A'}`}>
                  <span
                    className={'flex flex-row items-center gap-1'}
                    tabIndex={0}
                  >
                    <IkonNavnAvatar
                      fulltNavn={eierNavn ?? 'N A'}
                      størrelse={'sm'}
                      kantfarge
                      farge={'blå'}
                    />
                    {eierNavn ?? 'N/A'}
                  </span>
                </Tooltip>
              </span>
              <span>{' • '}</span>
            </>
          )}
          Opprettet {publisertDato}
          {eierNavkontor && (
            <>
              <span>{' • '}</span> {hentNavkontorNavn(eierNavkontor)}
            </>
          )}
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
