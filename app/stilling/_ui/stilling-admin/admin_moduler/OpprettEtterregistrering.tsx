import { navnSchema } from '@/app/api/kandidat-sok/useKandidatNavn';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import z from 'zod';

export const FormidlingKandidatSchema = z.object({
  fnr: z.string(),
  navn: navnSchema,
});

export type FormidlingKandidatDTO = z.infer<typeof FormidlingKandidatSchema>;

export interface FormidlingsDataDTO extends StillingsDataDTO {
  navKontor: string;
  formidlingKandidater: FormidlingKandidatDTO[];
  navIdent: string;
  reportee: string;
}

export interface OpprettEtterregistreringProps {
  disabled: boolean;
}

export default function OpprettEtterregistrering({
  disabled,
}: OpprettEtterregistreringProps) {
  const { getValues } = useFormContext<StillingsDataDTO>();
  const { track } = useUmami();
  const { brukerData, valgtNavKontor, visVarsel } = useApplikasjonContext();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const opprettEtterregistrering = async () => {
    setLoading(true);
    const dto = {
      ...getValues(),
      navKontor: valgtNavKontor?.navKontor || '',
      navIdent: brukerData.ident,
      reportee: `${brukerData.fornavn} ${brukerData.etternavn}`,
    };

    // debug dto om nødvendig
    try {
      const nyFormidling = await fetch('/api/etterregistrering/opprett', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
      });

      if (!nyFormidling.ok) {
        // Forsøk å hente feilmelding fra responsen
        let feilmelding = 'Klarte ikke å opprette etterregistrering';
        try {
          const maybeJson = await nyFormidling.clone().json();
          feilmelding = maybeJson?.message || feilmelding;
        } catch {
          try {
            const text = await nyFormidling.text();
            if (text) feilmelding = text;
          } catch {
            // ignore
          }
        }
        throw new RekbisError(`${feilmelding} (${nyFormidling.status})`);
      }

      const data = await nyFormidling.json();

      if (!data?.stillingsId) {
        throw new RekbisError('Mangler stillingsId i responsen');
      }

      // Track kun ved suksess
      track(
        UmamiEvent.Etterregistrering.fullført_etterregistrering_av_formidling,
      );

      track(UmamiEvent.Etterregistrering.yrkestittel_etterregistrering, {
        yrkestittel: dto.stilling?.categoryList?.[0]?.name,
      });

      router.push('/etterregistrering?portefolje=visMine');
    } catch {
      visVarsel({
        type: 'error',
        tekst: 'Klarte ikke å opprette etterregistrering',
      });
      // Ikke kast videre – vi viser varsel og evt. logg via overvåkning her
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        loading={loading}
        onClick={opprettEtterregistrering}
        size='small'
        disabled={disabled}
        title='Opprett etterregistrering'
      >
        Opprett
      </Button>
    </div>
  );
}
