'use client';

import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import RedigerStillingKnapp from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/RedigerStillingKnapp';
import ArbeidsplassenHandlinger from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/arbeidsplassen/ArbeidsplassenHandlinger';
import DupliserOppdragKnapp from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/dropdown/DupliserOppdragKnapp';
import OvertaEierskapKnapp from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/dropdown/OvertaEierskapKnapp';
import SlettOppdragKnapp from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/dropdown/SlettOppdragKnapp';
import StillingDropdown from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/dropdown/StillingDropdown';
import PauseOppdrag from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/endre-søkeforslag/EndreSøkeforslag';
import ForlengOppdrag from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/forleng-oppdrag/ForlengOppdrag';
import FullførStillingKnapp from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/fullfør-oppdrag/FullførStillingKnapp';
import StoppStillingKnapp from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/stopp-oppdrag/StoppStillingKnapp';
import { useStillingHandlingerOverflow } from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/useStillingHandlingerOverflow';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';

// Definerer alle handlinger som komponenter
const handlinger = [
  { id: 'stopp', Komponent: StoppStillingKnapp },
  { id: 'pause', Komponent: PauseOppdrag },
  { id: 'fullfor', Komponent: FullførStillingKnapp },
  { id: 'forleng', Komponent: ForlengOppdrag },
  { id: 'overta', Komponent: OvertaEierskapKnapp },
  { id: 'dupliser', Komponent: DupliserOppdragKnapp },
  { id: 'slett', Komponent: SlettOppdragKnapp },
];

export default function StillingHandlinger() {
  const { omStilling, stillingsData, erEier } = useStillingsContext();
  const kandidatlisteHook = useKandidatlisteForEier(stillingsData, erEier);
  const { wrapperRef, measureRef, antallSynlige } =
    useStillingHandlingerOverflow(handlinger.length);

  // Håndter 404-feil eller andre feil hvor kandidatliste ikke finnes
  const kandidatlisteFeil = kandidatlisteHook.error;
  const er404Feil =
    kandidatlisteFeil?.status === 404 ||
    kandidatlisteFeil?.message?.includes('404');

  if (!omStilling.erDirektemeldt) {
    return <ArbeidsplassenHandlinger />;
  }

  if (er404Feil || (kandidatlisteFeil && !kandidatlisteHook.isLoading)) {
    return (
      <TilgangskontrollForInnhold
        skjulVarsel
        kreverEnAvRollene={[
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        ]}
      >
        <RedigerStillingKnapp />
      </TilgangskontrollForInnhold>
    );
  }

  const synligeHandlinger = handlinger.slice(0, antallSynlige);
  const skjulteHandlinger = handlinger.slice(antallSynlige);

  return (
    <div ref={wrapperRef} className='flex flex-nowrap items-center gap-1'>
      {/* Usynlig måle-container for å beregne bredder */}
      <div
        ref={measureRef}
        className='pointer-events-none fixed -left-[9999px] flex gap-1'
        aria-hidden='true'
      >
        {handlinger.map(({ id, Komponent }) => (
          <div key={id} data-measure-item>
            <Komponent />
          </div>
        ))}
      </div>

      {/* Synlige knapper basert på tilgjengelig plass */}
      {synligeHandlinger.map(({ id, Komponent }) => (
        <Komponent key={id} />
      ))}

      {/* Dropdown med resterende handlinger */}
      {skjulteHandlinger.length > 0 && (
        <StillingDropdown>
          {skjulteHandlinger.map(({ id, Komponent }) => (
            <Komponent key={id} />
          ))}
        </StillingDropdown>
      )}
    </div>
  );
}
