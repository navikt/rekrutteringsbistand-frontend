import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import KandidatKnapper from '@/app/stilling/[stillingsId]/_ui/KandidatKnapper';
import StillingsutkastMelding from '@/app/stilling/[stillingsId]/_ui/StillingsutkastMelding';
import OmArbeidsgiver from '@/app/stilling/[stillingsId]/_ui/om-arbeidsgiver/OmArbeidsgiver';
import OmJobben from '@/app/stilling/[stillingsId]/_ui/om-jobben/OmJobben';
import OmStillingenHeader from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingenHeader';
import OmStillingsoppdraget from '@/app/stilling/[stillingsId]/_ui/om-stillingsoppdraget/OmStillingsoppdraget';
import SideInnhold from '@/components/layout/SideInnhold';
import { useRef } from 'react';

export interface OmStillingenProps {
  kandidatId?: string;
}

export default function OmStillingen({ kandidatId }: OmStillingenProps) {
  const { kandidatlisteInfo, stillingsData, forhåndsvisData, omStilling } =
    useStillingsContext();
  const kunVisning = kandidatId !== undefined;
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <SideInnhold
      lagreScrollNøkkel={`stilling-omstillingen-${stillingsData.stilling.uuid}`}
    >
      <OmStillingenHeader printRef={printRef} />
      <div className='@container/stilling'>
        <div className='grid grid-cols-1 gap-6 @min-[1024px]/stilling:grid-cols-[1fr_33%]'>
          <div className='space-y-4'>
            {!kunVisning &&
              !forhåndsvisData &&
              kandidatlisteInfo?.kandidatlisteId &&
              kandidatlisteInfo.kandidatlisteStatus !==
                Kandidatlistestatus.Lukket && <KandidatKnapper />}
            {omStilling.erUtkast && <StillingsutkastMelding />}
            <OmJobben printRef={printRef} skjulKnapper={kunVisning} />
          </div>
          <aside className='space-y-4'>
            <OmArbeidsgiver />
            <OmStillingsoppdraget />
          </aside>
        </div>
      </div>
    </SideInnhold>
  );
}
