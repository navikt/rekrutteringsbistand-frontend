'use client';

import { leggTilKandidater } from '@/app/api/kandidat-sok/leggTilKandidat';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { CogIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

/**
 * Viser knapp hvis path matcher /kandidat/kandidat-arenaKandidatnr-<tall>
 * Eksempel: /noe/annet/kandidat/kandidat-arenaKandidatnr-2?foo=bar
 */
export interface VisStillingKnapperProps {
  stillingsId: string;
}

export default function VisStillingKnapper({
  stillingsId,
}: VisStillingKnapperProps) {
  const { visVarsel } = useApplikasjonContext();
  const pathname = usePathname();
  const [leggTilKandidatLoading, setLeggerTilKandidatLoading] = useState(false);
  const { track } = useUmami();
  // Finn segmentet etter /kandidat/ som starter med kandidat-arenaKandidatnr-
  const kandidat = useMemo(
    () => pathname.match(/\/kandidat\/(kandidat-arenaKandidatnr-\d+)/),
    [pathname],
  );

  const leggTilKandidat = async (kandidatId: string) => {
    track(UmamiEvent.Stilling.forslag_til_stilling_legg_til_kandidat);
    setLeggerTilKandidatLoading(true);
    try {
      await leggTilKandidater([kandidatId], stillingsId);
      visVarsel({
        tekst: 'Jobbsøker er lagt til i kandidatliste',
        type: 'success',
      });
    } catch {
      visVarsel({
        tekst: 'Jobbsøker kunne ikke legges til i kandidatliste',
        type: 'error',
      });
    } finally {
      setLeggerTilKandidatLoading(false);
    }
  };

  return (
    <div className='flex gap-2 flex-col pb-5'>
      <Button variant='secondary' icon={<CogIcon />}>
        Administrer oppdraget
      </Button>
      {kandidat && (
        <Button
          loading={leggTilKandidatLoading}
          variant='secondary'
          onClick={() => {
            const kandidatnr = kandidat[1];
            leggTilKandidat(kandidatnr);
          }}
        >
          Legg til jobbsøker
        </Button>
      )}
    </div>
  );
}
