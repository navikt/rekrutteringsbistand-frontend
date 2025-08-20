import { useForespurteOmDelingAvCv } from '../../../api/foresporsel-om-deling-av-cv/foresporsler/[...slug]/useForespurteOmDelingAvCv';
import { useKandidatlisteForEier } from '../../../api/kandidat/useKandidatlisteForEier';
import { useSmserForStilling } from '../../../api/kandidatvarsel/kandidatvarsel';
import SWRLaster from '../../../components/SWRLaster';
import { useApplikasjonContext } from '../../../providers/ApplikasjonContext';
import { useStillingsContext } from '../StillingsContext';
import { KandidatlisteContextProvider } from './KandidatlisteContext';
import { KandidatlisteFilterContextProvider } from './components/KandidatlisteFilter/KandidatlisteFilterContext';
import { overtaEierskap } from '@/app/api/stilling/overta-eierskap/overtaEierskap';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

export interface KandidatlisteWrapperProps {
  children?: React.ReactNode | undefined;
}

const KandidatlisteWrapper: React.FC<KandidatlisteWrapperProps> = ({
  children,
}) => {
  const { brukerData, valgtNavKontor } = useApplikasjonContext();
  const { stillingsData, erEier } = useStillingsContext();

  const forespurteKandidaterHook = useForespurteOmDelingAvCv(
    stillingsData.stilling.uuid,
  );
  const beskjederHook = useSmserForStilling(stillingsData.stilling.uuid);
  const kandidatlisteHook = useKandidatlisteForEier(stillingsData, erEier);

  const onOvertaStilling = async () => {
    await overtaEierskap({
      stillingsid: stillingsData.stilling.uuid,
      eierNavident: brukerData.ident,
      eierNavn: brukerData.navn,
      eierNavKontorEnhetId: valgtNavKontor?.navKontor,
    });
    window.location.reload();
  };

  const reFetchKandidatliste = () => {
    kandidatlisteHook.mutate();
    forespurteKandidaterHook.mutate();
    beskjederHook.mutate();
  };

  return (
    <SWRLaster
      hooks={[kandidatlisteHook, forespurteKandidaterHook, beskjederHook]}
      egenFeilmelding={() => (
        <div>
          Feil ved henting av kandidater
          <br />
          Du får ikke vise kandidater hvis du ikke er eier, du kan prøve å ta
          eierskap på nytt
          <Button
            onClick={onOvertaStilling}
            variant='secondary'
            size='small'
            className='my-2 h-5 w-full'
          >
            Ta eierskap
          </Button>
        </div>
      )}
    >
      {(kandidatliste, forespurteKandidater, beskjeder) => {
        return (
          <KandidatlisteFilterContextProvider>
            <KandidatlisteContextProvider
              kandidatliste={kandidatliste}
              forespurteKandidater={forespurteKandidater}
              beskjeder={beskjeder}
              reFetchKandidatliste={reFetchKandidatliste}
            >
              {children}
            </KandidatlisteContextProvider>
          </KandidatlisteFilterContextProvider>
        );
      }}
    </SWRLaster>
  );
};

export default KandidatlisteWrapper;
