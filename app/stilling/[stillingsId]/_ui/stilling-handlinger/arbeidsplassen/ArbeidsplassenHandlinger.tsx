import HarKandidatlisteVisning from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/arbeidsplassen/HarKandidatlisteVisning';
import OpprettStillingsoppdrag from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/arbeidsplassen/OpprettStillingsoppdrag';
import DynamiskDropdown from '@/components/DynamiskDropdown/DynamiskDropdown';

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
        <DynamiskDropdown>
          <div className='@min-[600px]/header:hidden'>
            <OpprettStillingsoppdrag />
          </div>
          <div className='@min-[700px]/header:hidden'>
            <HarKandidatlisteVisning />
          </div>
        </DynamiskDropdown>
      </div>
    </div>
  );
}
