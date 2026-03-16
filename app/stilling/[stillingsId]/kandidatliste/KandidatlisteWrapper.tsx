'use client';

import { KandidatlisteContextProvider } from './KandidatlisteContext';
import {
  KandidatlisteFilterContextProvider,
  useKandidatlisteFilterContext,
} from './_ui/KandidatlisteFilter/KandidatlisteFilterContext';
import { useForespurteOmDelingAvCv } from '@/app/api/foresporsel-om-deling-av-cv/foresporsler/[...slug]/useForespurteOmDelingAvCv';
import { useKandidater } from '@/app/api/kandidat/useKandidater';
import { useSmserForStilling } from '@/app/api/kandidatvarsel/kandidatvarsel';
import { overtaEierskap } from '@/app/api/stilling/overta-eierskap/overtaEierskap';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import SWRLaster from '@/components/SWRLaster';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { Button } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

export interface KandidatlisteWrapperProps {
  children?: ReactNode | undefined;
}

const KandidatlisteWrapper: FC<KandidatlisteWrapperProps> = ({ children }) => {
  return (
    <KandidatlisteFilterContextProvider>
      <KandidatlisteDataHenter>{children}</KandidatlisteDataHenter>
    </KandidatlisteFilterContextProvider>
  );
};

const KandidatlisteDataHenter: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const { brukerData, valgtNavKontor } = useApplikasjonContext();
  const { stillingsData, erEier } = useStillingsContext();
  const { side, visAntall } = useKandidatlisteFilterContext();

  const forespurteKandidaterHook = useForespurteOmDelingAvCv(
    stillingsData.stilling.uuid,
  );

  const beskjederHook = useSmserForStilling(stillingsData.stilling.uuid);
  const kandidatlisteHook = useKandidater(
    stillingsData,
    erEier,
    side,
    visAntall,
  );

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
      {(kandidater, forespurteKandidater, beskjeder) => {
        return (
          <KandidatlisteContextProvider
            jobbSøkere={kandidater}
            forespurteKandidater={forespurteKandidater}
            beskjeder={beskjeder}
            reFetchKandidatliste={reFetchKandidatliste}
          >
            {children}
          </KandidatlisteContextProvider>
        );
      }}
    </SWRLaster>
  );
};

export default KandidatlisteWrapper;
