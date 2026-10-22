'use client';

import { KandidatlisteContextProvider } from './KandidatlisteContext';
import {
  KandidatlisteFilterContextProvider,
  useKandidatlisteFilterContext,
} from './_ui/KandidatlisteFilter/KandidatlisteFilterContext';
import KandidatlisteFilterrad from './_ui/KandidatlisteFilter/KandidatlisteFilterrad';
import { useKandidatnrIListe } from '@/app/api/kandidat/useKandidatnrIListe';
import {
  useKandidlisteKandidater,
  useMutateKandidlisteKandidater,
} from '@/app/api/kandidat/useKandidlisteKandidater';
import { overtaEierskap } from '@/app/api/stilling/overta-eierskap/overtaEierskap';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import SWRLaster from '@/components/SWRLaster';
import Feilmelding from '@/components/feilhåndtering/Feilmelding';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { BodyShort, Button } from '@navikt/ds-react';
import { FC, ReactNode, useEffect } from 'react';
import { ZodError } from 'zod';

export interface KandidatlisteWrapperProps {
  children?: ReactNode | undefined;
  skjulFilterrad?: boolean;
}

const KandidatlisteWrapper: FC<KandidatlisteWrapperProps> = ({
  children,
  skjulFilterrad,
}) => {
  return (
    <KandidatlisteFilterContextProvider>
      <KandidatlisteDataHenter skjulFilterrad={skjulFilterrad}>
        {children}
      </KandidatlisteDataHenter>
    </KandidatlisteFilterContextProvider>
  );
};

const KandidatlisteDataHenter: FC<{
  children?: ReactNode;
  skjulFilterrad?: boolean;
}> = ({ children, skjulFilterrad }) => {
  const { brukerData, valgtNavKontor } = useApplikasjonContext();
  const { stillingsData, erEier } = useStillingsContext();
  const mutateKandidlisteKandidater = useMutateKandidlisteKandidater();
  const {
    side,
    visAntall,
    sortering,
    fritekstSøk,
    internStatus,
    hendelseFilter,
    visSlettede,
    setAntallPerKategoriPerFilter,
  } = useKandidatlisteFilterContext();

  const kandidatlisteHook = useKandidlisteKandidater(stillingsData, erEier, {
    side,
    antallPerSide: visAntall,
    sortering,
    fritekst: fritekstSøk,
    internStatus,
    kandidatlisteHendelseType: hendelseFilter,
    visSlettede: visSlettede === 'true',
  });

  const kandidatnrIListeHook = useKandidatnrIListe(
    stillingsData?.stilling.uuid,
    erEier,
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
    mutateKandidlisteKandidater(stillingsData.stilling.uuid);
  };

  useEffect(() => {
    if (kandidatlisteHook.data?.antallPerKategoriPerFilter) {
      setAntallPerKategoriPerFilter(
        kandidatlisteHook.data.antallPerKategoriPerFilter,
      );
    }
  }, [
    kandidatlisteHook.data?.antallPerKategoriPerFilter,
    setAntallPerKategoriPerFilter,
  ]);

  return (
    <>
      {!skjulFilterrad && <KandidatlisteFilterrad />}
      <SWRLaster
        hooks={[kandidatlisteHook, kandidatnrIListeHook]}
        egenFeilmelding={(error) =>
          error instanceof RekbisError && error.statuskode === 403 ? (
            <div>
              Feil ved henting av kandidater
              <br />
              Du får ikke vise kandidater hvis du ikke er eier, du kan prøve å
              ta eierskap på nytt
              <Button
                onClick={onOvertaStilling}
                variant='secondary'
                size='small'
                className='my-2 h-5 w-full'
              >
                Ta eierskap
              </Button>
            </div>
          ) : (
            <div>
              <BodyShort className='font-bold'>
                Feil ved henting av kandidater
              </BodyShort>
              {error instanceof RekbisError ? (
                <Feilmelding error={error} />
              ) : (
                <Feilmelding
                  {...error}
                  message='Feil ved henting av data'
                  zodError={error instanceof ZodError ? error : undefined}
                />
              )}
            </div>
          )
        }
      >
        {(kandidater, kandidatnrIListe) => {
          if (!kandidater || !kandidatnrIListe) return null;
          return (
            <KandidatlisteContextProvider
              jobbSøkere={kandidater}
              alleKandidatnr={kandidatnrIListe.kandidatnr}
              reFetchKandidatliste={reFetchKandidatliste}
            >
              {children}
            </KandidatlisteContextProvider>
          );
        }}
      </SWRLaster>
    </>
  );
};

export default KandidatlisteWrapper;
