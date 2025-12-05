'use client';

import DelMedArbeidsgiver from './DelMedArbeidsgiver/DelMedArbeidsgiver';
import DelMedKandidatModal from './DelMedKandidat/DelMedKandidatModal';
import useFiltrerteKandidater from './KandidatlisteFilter/useFiltrerteKandidater';
import SendSmsModal from './SendSMS/SendSmsModal';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import SendSmsKnapp from '@/app/stilling/[stillingsId]/kandidatliste/_ui/SendSMS/SendSmsKnapp';
import { Checkbox } from '@navikt/ds-react';
import { FC, useState } from 'react';

const KandidatlisteHandlingsRad: FC = () => {
  const {
    kandidater,
    lukketKandidatliste,
    markerteKandidater,
    setMarkerteKandidater,
  } = useKandidatlisteContext();
  const {
    omStilling: { erJobbmesse },
  } = useStillingsContext();

  // filtrerteKandidater
  const filtrerteKandidater = useFiltrerteKandidater();
  const [visSendSmsModal, setVisSendSmsModal] = useState(false);

  return (
    <div className='flex flex-row flex-wrap items-baseline gap-4'>
      <Checkbox
        className='ml-5'
        disabled={lukketKandidatliste}
        checked={
          markerteKandidater && markerteKandidater.length === kandidater.length
        }
        indeterminate={
          markerteKandidater &&
          markerteKandidater.length > 0 &&
          markerteKandidater.length !== kandidater.length
        }
        onChange={() => {
          if (markerteKandidater.length) {
            setMarkerteKandidater([]);
          } else {
            if (filtrerteKandidater?.kandidater) {
              setMarkerteKandidater(
                filtrerteKandidater.kandidater.filter(
                  (k) => k.fodselsnr !== null,
                ),
              );
            }
          }
        }}
      >
        <span>
          {markerteKandidater.length > 0 && (
            <span> {markerteKandidater.length} valgt</span>
          )}
        </span>
      </Checkbox>
      {!lukketKandidatliste && (
        <>
          {!erJobbmesse && (
            <>
              <div>
                <DelMedKandidatModal
                  markerteKandidater={markerteKandidater}
                  fjernAllMarkering={() => setMarkerteKandidater([])}
                />
              </div>
              <div>
                <DelMedArbeidsgiver markerteKandidater={markerteKandidater} />
              </div>
            </>
          )}
          <div>
            <SendSmsKnapp
              markerteKandidater={markerteKandidater}
              knappVariant={'tertiary'}
              visSendSmsModal={setVisSendSmsModal}
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
    </div>
  );
};

export default KandidatlisteHandlingsRad;
