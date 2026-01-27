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
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';

export default function StillingHandlinger() {
  const { omStilling, stillingsData, erEier } = useStillingsContext();
  const kandidatlisteHook = useKandidatlisteForEier(stillingsData, erEier);

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

  // Bruk container queries basert på header-bredde
  return (
    <div className='flex items-center gap-1'>
      {/* Knapper som vises progressivt når det er plass */}
      <div className='hidden @min-[600px]/header:block'>
        <StoppStillingKnapp />
      </div>
      <div className='hidden @min-[600px]/header:block'>
        <PauseOppdrag />
      </div>
      <div className='hidden @min-[700px]/header:block'>
        <FullførStillingKnapp />
      </div>
      <div className='hidden @min-[800px]/header:block'>
        <ForlengOppdrag />
      </div>
      <div className='hidden @min-[950px]/header:block'>
        <OvertaEierskapKnapp />
      </div>
      <div className='hidden @min-[1100px]/header:block'>
        <DupliserOppdragKnapp />
      </div>
      <div className='hidden @min-[1250px]/header:block'>
        <SlettOppdragKnapp />
      </div>

      {/* Dropdown som alltid vises, men skjules når alle knapper er synlige */}
      <div className='@min-[1250px]/header:hidden'>
        <StillingDropdown>
          <div className='@min-[600px]/header:hidden'>
            <StoppStillingKnapp />
          </div>
          <div className='@min-[600px]/header:hidden'>
            <PauseOppdrag />
          </div>
          <div className='@min-[700px]/header:hidden'>
            <FullførStillingKnapp />
          </div>
          <div className='@min-[800px]/header:hidden'>
            <ForlengOppdrag />
          </div>
          <div className='@min-[950px]/header:hidden'>
            <OvertaEierskapKnapp />
          </div>
          <div className='@min-[1100px]/header:hidden'>
            <DupliserOppdragKnapp />
          </div>
          <div className='@min-[1250px]/header:hidden'>
            <SlettOppdragKnapp />
          </div>
        </StillingDropdown>
      </div>
    </div>
  );
}
