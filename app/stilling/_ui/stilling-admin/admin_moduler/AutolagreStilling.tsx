'use client';

import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { mapSendStillingOppdatering } from '@/app/stilling/_ui/stilling-admin/admin_moduler/mapVerdier';
import { StillingAdminDTO } from '@/app/stilling/_ui/stilling-admin/page';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { FloppydiskIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { logger } from '@navikt/next-logger';

interface AutolagreStillingProps {
  stillingsData: StillingAdminDTO;
  /** (valgfritt) override på intervall i ms for testing */
  intervallMs?: number;
}

// Hjelpefunksjon for menneskelig tidsformat
const formatElapsed = (sekunder: number) => {
  if (sekunder < 60) return `${sekunder}s`;
  const minutter = Math.floor(sekunder / 60);
  const restSek = sekunder % 60;
  if (minutter < 60)
    return restSek ? `${minutter}m ${restSek}s` : `${minutter}m`;
  const timer = Math.floor(minutter / 60);
  const restMin = minutter % 60;
  return restMin ? `${timer}t ${restMin}m` : `${timer}t`;
};

export default function AutolagreStilling({
  stillingsData,
  intervallMs = 5 * 60 * 1000, // 5 minutter default
}: AutolagreStillingProps) {
  const { brukerData, valgtNavKontor } = useApplikasjonContext();
  const [sisteLagret, setSisteLagret] = useState<Date | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [teller, setTeller] = useState(0); // sekunder siden sist lagring
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const tickRef = useRef<NodeJS.Timeout | null>(null);
  const inFlightRef = useRef<Promise<any> | null>(null);
  const { getValues, setValue } = useFormContext<StillingsDataDTO>();
  const erPublisert = stillingsData?.stilling?.status === StillingsStatus.Aktiv;

  const kanLagre =
    !erPublisert &&
    !!stillingsData?.stilling &&
    !!(stillingsData as any).stilling?.uuid; // trenger eksisterende stilling for oppdatering

  const lagre = async () => {
    if (!kanLagre) return;
    if (saving) return; // unngå parallell

    const nyeVerdier = getValues();

    setSaving(true);
    setError(null);
    try {
      const mapedValues = mapSendStillingOppdatering({
        stilling: nyeVerdier.stilling,
        stillingsinfo: nyeVerdier.stillingsinfo || undefined,
      });
      const promise = oppdaterStilling(mapedValues, {
        eierNavident: brukerData.ident,
        eierNavn: brukerData.navn,
        eierNavKontorEnhetId: valgtNavKontor?.navKontor,
      });
      inFlightRef.current = promise;
      const result = await promise;

      const stilling : StillingsDataDTO = result;

      logger.info(`result ${JSON.stringify(result)}`);
      logger.info(`Versjon ${stilling.stilling.versjon}` );

      setSisteLagret(new Date());
      setTeller(0);
    } catch (e: any) {
      setError(e?.message || 'Feil ved lagring');
    } finally {
      setSaving(false);
      inFlightRef.current = null;
    }
  };

  // Oppdater teller hvert sekund
  useEffect(() => {
    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = setInterval(() => {
      setTeller(
        sisteLagret
          ? Math.floor((Date.now() - sisteLagret.getTime()) / 1000)
          : 0,
      );
    }, 1000);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [sisteLagret]);

  // Autolagre intervall
  useEffect(() => {
    if (!kanLagre) return; // ikke sett intervall
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      // unngå å trigge hvis vi ikke har endringer? (ikke tilgjengelig nå) -> alltid lagre
      lagre();
    }, intervallMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kanLagre, intervallMs, stillingsData]);

  // Første lagring initielt? Vi velger å ikke lagre umiddelbart, kun starte timer.

  if (erPublisert) {
    return null; // skal ikke autolagre eller vise noe hvis publisert
  }

  if (!kanLagre) {
    return (
      <div className='text-xs text-gray-600' aria-live='polite'>
        Autolagring: ingen eksisterende stilling ennå
      </div>
    );
  }

  const statusTekst = saving
    ? 'Lagrer…'
    : error
      ? `Feil: ${error}`
      : sisteLagret
        ? `Sist lagret for ${formatElapsed(teller)} siden`
        : 'Ikke lagret enda';

  return (
    <div className='flex items-center gap-2 text-xs' aria-live='polite'>
      <Button
        icon={<FloppydiskIcon />}
        size='xsmall'
        variant='tertiary'
        onClick={lagre}
        loading={saving}
        disabled={saving}
      >
        {statusTekst}
      </Button>
    </div>
  );
}
