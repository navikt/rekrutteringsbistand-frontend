'use client';

import { settOppMøteplan } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useRapporterLagringsstatus';
import {
  MøteoppsettFormSchema,
  tilMøteoppsettSkjemaverdier,
  type MøteoppsettSkjemaverdier,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/møteoppsettSkjema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  rekrutteringstreffId: string;
  treffgjennomføring: TreffgjennomføringDTO;
  oppdatering: TreffgjennomføringOppdatering;
  onLagringsstatusEndret: (lagrer: boolean) => void;
  feilmelding: string;
  onLagret?: () => void;
}

/** Skjema for starttidspunkt og møtevarighet, både ved oppretting og redigering. */
export const useMøteoppsettSkjema = ({
  rekrutteringstreffId,
  treffgjennomføring,
  oppdatering,
  onLagringsstatusEndret,
  feilmelding,
  onLagret,
}: Props) => {
  const skjema = useForm<MøteoppsettSkjemaverdier>({
    resolver: zodResolver(MøteoppsettFormSchema),
    defaultValues: tilMøteoppsettSkjemaverdier(treffgjennomføring),
  });
  const [feil, setFeil] = useState<string | null>(null);

  useRapporterLagringsstatus(
    skjema.formState.isSubmitting,
    onLagringsstatusEndret,
  );

  const lagre = skjema.handleSubmit(async (verdier) => {
    setFeil(null);
    try {
      await oppdatering.brukLagretSvar(
        await settOppMøteplan(rekrutteringstreffId, verdier),
      );
      onLagret?.();
    } catch {
      setFeil(feilmelding);
    }
  });

  return { skjema, feil, nullstillFeil: () => setFeil(null), lagre };
};
