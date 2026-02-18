import OversiktKurs from './_ui/OversiktKurs';
import { useJobbsøkerContext } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/JobbsøkerContext';
import { LeggTilKnappType } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/VisJobbsøker';
import LeggTilKandidatKnapp from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/_ui/LeggTilKandidatKnapp';
import OversiktErfaring from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/_ui/OversiktErfaring';
import OversiktFørerkort from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/_ui/OversiktFørerkort';
import OversiktOffentligeGodkjenninger from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/_ui/OversiktGodkjenninger';
import OversiktHeader from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/_ui/OversiktHeader';
import JobbØnsker from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/_ui/OversiktJobbØnsker';
import OversiktKompetanse from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/_ui/OversiktKompetanse';
import OversiktSammendrag from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/_ui/OversiktSammendrag';
import OversiktAndreGodkjenninger from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/_ui/OversiktSertifikater';
import OversiktSpråk from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/_ui/OversiktSpråk';
import OversiktUtdanning from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/_ui/OversiktUtdanning';
import Profilkvalitet from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/_ui/Profilkvalitet';
import FinnStillingForKandidatKnapp from '@/app/kandidat/_ui/ActionLinks/FinnStillingForKandidatKnapp';
import NavigerTilAktivitetsplanenKnapp from '@/app/kandidat/_ui/ActionLinks/NavigerTilAktivitetsplanenKnapp';
import SideInnhold from '@/components/layout/SideInnhold';

export interface JobbbsøkerOversiktProps {
  leggTilKnapp?: LeggTilKnappType;
}

export default function JobbbsøkerOversikt({
  leggTilKnapp,
}: JobbbsøkerOversiktProps) {
  const { kandidatId, kandidatData } = useJobbsøkerContext();

  return (
    <SideInnhold lagreScrollNøkkel={`kandidat-oversikt-${kandidatId}`}>
      <div className='@container/kandidat space-y-4'>
        <div>
          <OversiktHeader />
        </div>
        <div className='grid grid-cols-1 gap-6 @min-[1024px]/kandidat:grid-cols-2'>
          {leggTilKnapp ? (
            <LeggTilKandidatKnapp
              leggTilKnapp={leggTilKnapp}
              kandidatId={kandidatId}
            />
          ) : (
            <FinnStillingForKandidatKnapp kandidatId={kandidatId} />
          )}
          <NavigerTilAktivitetsplanenKnapp
            fnr={kandidatData.fodselsnummer ?? null}
          />
          <div className='grid grid-cols-1 gap-6'>
            <JobbØnsker />
            <OversiktSammendrag />
            <OversiktUtdanning /> <OversiktErfaring />
          </div>
          <div className='grid grid-cols-1 gap-6'>
            <OversiktFørerkort />
            <OversiktSpråk />
            <OversiktKompetanse />
            <OversiktOffentligeGodkjenninger />
            <OversiktAndreGodkjenninger />
            <OversiktKurs />
            <Profilkvalitet />
          </div>
        </div>
      </div>
    </SideInnhold>
  );
}
