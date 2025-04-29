import { useForespurteOmDelingAvCv } from '../../../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
import { useKandidatliste } from '../../../../../api/kandidat/useKandidatliste';
import { useSmserForStilling } from '../../../../../api/kandidatvarsel/kandidatvarsel';
import SWRLaster from '../../../../../components/SWRLaster';
import { KandidatContextProvider } from '../../../../../kandidat/VisKandidat/KandidatContext';
import KandidatSide from '../../../../../kandidat/VisKandidat/KandidatSide';
import KandidatSideLayout from '../../../../../kandidat/VisKandidat/KandidatsideLayout';
import { useStillingsContext } from '../../../StillingsContext';
import {
  KandidatlisteContextProvider,
  useKandidatlisteContext,
} from '../../KandidatlisteContext';
import { KandidatVisningProps } from '../KandidatlisteFilter/useFiltrerteKandidater';
import KandidatHandlingerForStilling from './KandidatHandlingerForStilling';
import {
  ChevronDownIcon,
  ChevronRightDoubleIcon,
  ChevronUpIcon,
} from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

export interface KandidatVisningSidebarProps {
  kandidatnr: string;
}

const KandidatVisningSidebar: React.FC<KandidatVisningSidebarProps> = ({
  kandidatnr,
}) => {
  const { kandidater } = useKandidatlisteContext();
  const { stillingsData } = useStillingsContext();

  const forespurteKandidaterHook = useForespurteOmDelingAvCv(
    stillingsData.stilling.uuid,
  );
  const beskjederHook = useSmserForStilling(stillingsData.stilling.uuid);
  const kandidatlisteHook = useKandidatliste(stillingsData.stilling.uuid);

  const [currentKandidatnr, setCurrentKandidatnr] =
    React.useState<string>(kandidatnr);
  const [kandidat, setKandidat] = React.useState<KandidatVisningProps | null>(
    null,
  );

  const kandidaIndex = kandidater
    .filter((k) => k.fodselsnr !== null)
    .findIndex((kandidat) => kandidat.kandidatnr === currentKandidatnr);

  const forrigeKandidatIndex = kandidaIndex > 0 ? kandidaIndex - 1 : null;

  const nesteKandidatIndex =
    kandidaIndex < kandidater.length - 1 ? kandidaIndex + 1 : null;

  React.useEffect(() => {
    const currentKandidat = kandidater.find(
      (k) => k.kandidatnr === currentKandidatnr,
    );

    if (currentKandidat) {
      setKandidat(currentKandidat);
    }
  }, [currentKandidatnr, kandidater]);

  const handlePreviousClick = () => {
    if (forrigeKandidatIndex !== null) {
      setCurrentKandidatnr(kandidater[forrigeKandidatIndex].kandidatnr);
    }
  };

  const handleNextClick = () => {
    if (nesteKandidatIndex !== null) {
      setCurrentKandidatnr(kandidater[nesteKandidatIndex].kandidatnr);
    }
  };

  if (!kandidat) {
    return null;
  }

  return (
    <SWRLaster
      hooks={[kandidatlisteHook, forespurteKandidaterHook, beskjederHook]}
    >
      {(kandidatliste, forespurteKandidater, beskjeder) => {
        return (
          <KandidatlisteContextProvider
            kandidatliste={kandidatliste}
            forespurteKandidater={forespurteKandidater}
            beskjeder={beskjeder}
            reFetchKandidatliste={() => kandidatlisteHook.mutate()}
          >
            <div className='w-[600px] overflow-y-auto max-h-screen'>
              <div className='sticky top-0 z-10 flex items-center justify-between bg-background p-3 '>
                <div className='flex items-center'>
                  <div>
                    <div className='aksel-button aksel-button--tertiary aksel-button--small aksel-button--icon-only '>
                      <ChevronRightDoubleIcon />
                    </div>
                  </div>
                  <div className='w-0 h-4 outline outline-offset-[-0.50px] outline-Border-Accent-Accent-Subtle mx-1' />
                  <div>
                    <Button
                      variant='tertiary'
                      size='small'
                      disabled={!forrigeKandidatIndex}
                      onClick={handlePreviousClick}
                      icon={<ChevronUpIcon />}
                    />
                  </div>
                  <div>
                    <Button
                      size='small'
                      variant='tertiary'
                      disabled={!nesteKandidatIndex}
                      onClick={handleNextClick}
                      icon={<ChevronDownIcon />}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className='pl-5 pt-6 text-3xl'>
                    {kandidat.fornavn} {kandidat.etternavn}
                  </div>
                </div>
                <div className='sr-only'>
                  Kandidatinformasjon for {kandidat.fornavn}{' '}
                  {kandidat.etternavn}
                </div>
              </div>

              <div className='px-5 pb-5'>
                <KandidatContextProvider kandidatId={kandidat.kandidatnr}>
                  <KandidatSideLayout>
                    <KandidatHandlingerForStilling kandidat={kandidat} />
                    <KandidatSide />
                  </KandidatSideLayout>
                </KandidatContextProvider>
              </div>
            </div>
          </KandidatlisteContextProvider>
        );
      }}
    </SWRLaster>
  );
};

export default KandidatVisningSidebar;
