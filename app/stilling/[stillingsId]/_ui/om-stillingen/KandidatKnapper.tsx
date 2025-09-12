import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import FinnKandidaterKnapp from '@/app/stilling/[stillingsId]/_ui/FinnKandidaterKnapp';
import LeggTilKandidatTilStilling from '@/app/stilling/[stillingsId]/_ui/LeggTilKandidatTilStilling';
import {
  VisningsStatus,
  visStillingsDataInfo,
} from '@/app/stilling/_util/stillingInfoUtil';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';

export default function KandidatKnapper() {
  const { stillingsData, erEier } = useStillingsContext();

  const info = visStillingsDataInfo(stillingsData);

  if (
    info.visningsStatus === VisningsStatus.Avbrutt ||
    info.visningsStatus === VisningsStatus.Fullfort ||
    info.visningsStatus === VisningsStatus.IkkePublisert
  ) {
    return null;
  }

  if (!erEier) {
    if (
      info.visningsStatus === VisningsStatus.StengtForSokere ||
      info.visningsStatus === VisningsStatus.UtloptStengtForSokere
    ) {
      return null;
    }
  }

  return (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      <div className='grid grid-cols-2 gap-4 mb-6'>
        <FinnKandidaterKnapp stillingId={stillingsData.stilling.uuid} />

        <LeggTilKandidatTilStilling
          stillingsId={stillingsData.stilling.uuid}
          stillingsTittel={stillingsData.stilling.title}
        />
      </div>
    </TilgangskontrollForInnhold>
  );
}
