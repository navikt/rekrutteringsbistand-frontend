import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import HarKandidatlisteVisning from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/arbeidsplassen/HarKandidatlisteVisning';
import OpprettStillingsoppdrag from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/arbeidsplassen/OpprettStillingsoppdrag';
import OvertaEierskapKnapp from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/dropdown/OvertaEierskapKnapp';
import DynamiskDropdown from '@/components/DynamiskDropdown/DynamiskDropdown';

export default function ArbeidsplassenHandlinger() {
  const { stillingsData } = useStillingsContext();
  const harStillingsinfo = stillingsData.stillingsinfo !== null;

  if (!harStillingsinfo) {
    return (
      <div className='flex gap-1'>
        <div className='hidden @min-[600px]/header:block'>
          <OpprettStillingsoppdrag />
        </div>
        <div className='@min-[600px]/header:hidden'>
          <DynamiskDropdown>
            <OpprettStillingsoppdrag />
          </DynamiskDropdown>
        </div>
      </div>
    );
  }

  return (
    <div className='flex gap-1'>
      <div className='hidden @min-[600px]/header:block'>
        <OvertaEierskapKnapp />
      </div>
      <div className='hidden @min-[700px]/header:block'>
        <HarKandidatlisteVisning />
      </div>

      <div className='@min-[700px]/header:hidden'>
        <DynamiskDropdown>
          <div className='@min-[600px]/header:hidden'>
            <OvertaEierskapKnapp />
          </div>
          <div className='@min-[700px]/header:hidden'>
            <HarKandidatlisteVisning />
          </div>
        </DynamiskDropdown>
      </div>
    </div>
  );
}
