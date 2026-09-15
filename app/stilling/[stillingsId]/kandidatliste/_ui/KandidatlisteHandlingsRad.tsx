'use client';

import DelMedArbeidsgiver from './DelMedArbeidsgiver/DelMedArbeidsgiver';
import DelMedKandidatModal from './DelMedKandidat/DelMedKandidatModal';
import useFiltrerteKandidater from './KandidatlisteFilter/useFiltrerteKandidater';
import SendSmsModal from './SendSMS/SendSmsModal';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import SendSmsKnapp from '@/app/stilling/[stillingsId]/kandidatliste/_ui/SendSMS/SendSmsKnapp';
import { erValgbarKandidat } from '@/app/stilling/[stillingsId]/kandidatliste/util';
import MarkerAllePåSiden from '@/components/MarkerteKandidater/MarkerAllePåSiden';
import Markeringsrad from '@/components/MarkerteKandidater/Markeringsrad';
import { LeggTilJobbsøkerType } from '@/components/legg-til-jobbsøker/LeggTilJobbsøker';
import LeggTilJobbsøkerMeny from '@/components/legg-til-jobbsøker/LeggTilJobbsøkerMeny';
import { UmamiEvent } from '@/util/umamiEvents';
import { FC, useState } from 'react';

const KandidatlisteHandlingsRad: FC = () => {
  const { lukketKandidatliste, markerteKandidater, setMarkerteKandidater } =
    useKandidatlisteContext();
  const {
    omStilling: { erJobbmesse },
    stillingsId,
  } = useStillingsContext();

  const filtrerteKandidater = useFiltrerteKandidater();
  const [visSendSmsModal, setVisSendSmsModal] = useState(false);

  const valgbareKandidater =
    filtrerteKandidater?.kandidater?.filter(erValgbarKandidat) ?? [];

  const markerAlle = () => {
    const kandidaterPerId = new Map(
      markerteKandidater.map((k) => [k.fodselsnr, k]),
    );
    for (const kandidat of valgbareKandidater) {
      kandidaterPerId.set(kandidat.fodselsnr, kandidat);
    }
    setMarkerteKandidater([...kandidaterPerId.values()]);
  };

  return (
    <Markeringsrad>
      <MarkerAllePåSiden
        disabled={lukketKandidatliste}
        valgbareIder={valgbareKandidater.map((k) => k.fodselsnr)}
        markerteIder={markerteKandidater.flatMap((k) =>
          k.fodselsnr ? [k.fodselsnr] : [],
        )}
        onMarkerAlle={markerAlle}
        onFjernAlle={() => setMarkerteKandidater([])}
      />
      <LeggTilJobbsøkerMeny
        type={LeggTilJobbsøkerType.Stilling}
        finnHref={`/stilling/${stillingsId}/finn-kandidater`}
        finnUmamiEvent={UmamiEvent.Stilling.finn_kandidater_knapp}
        disabled={lukketKandidatliste}
        tooltip={lukketKandidatliste ? 'Kandidatlisten er lukket' : undefined}
        størrelse='small'
      />
      {!lukketKandidatliste && (
        <>
          {!erJobbmesse && (
            <>
              <DelMedKandidatModal
                markerteKandidater={markerteKandidater}
                fjernAllMarkering={() => setMarkerteKandidater([])}
              />

              <DelMedArbeidsgiver markerteKandidater={markerteKandidater} />
            </>
          )}
          <div>
            <SendSmsKnapp
              markerteKandidater={markerteKandidater}
              knappVariant={'tertiary'}
              setVisSendSmsModal={setVisSendSmsModal}
            />
          </div>
          {visSendSmsModal && (
            <SendSmsModal
              markerteKandidater={markerteKandidater}
              fjernAllMarkering={() => setMarkerteKandidater([])}
              setVisSendSmsModal={() => setVisSendSmsModal(false)}
            />
          )}
        </>
      )}
    </Markeringsrad>
  );
};

export default KandidatlisteHandlingsRad;
