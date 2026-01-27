import HarKandidatlisteVisning from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/arbeidsplassen/HarKandidatlisteVisning';
import OpprettStillingsoppdrag from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/arbeidsplassen/OpprettStillingsoppdrag';
import StillingDropdown from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/dropdown/StillingDropdown';

export default function ArbeidsplassenHandlinger() {
  return (
    <div className='flex items-center gap-1'>
      {/* Knapper som vises når det er plass */}
      <div className='hidden @min-[600px]/header:block'>
        <OpprettStillingsoppdrag />
      </div>
      <div className='hidden @min-[700px]/header:block'>
        <HarKandidatlisteVisning />
      </div>

      {/* Dropdown som vises når knapper er skjult */}
      <div className='@min-[700px]/header:hidden'>
        <StillingDropdown>
          <div className='@min-[600px]/header:hidden'>
            <OpprettStillingsoppdrag />
          </div>
          <div className='@min-[700px]/header:hidden'>
            <HarKandidatlisteVisning />
          </div>
        </StillingDropdown>
      </div>
    </div>
  );
}
