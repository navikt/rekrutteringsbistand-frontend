'use client';

import DelMedArbeidsgiver from './DelMedArbeidsgiver/DelMedArbeidsgiver';
import DelMedKandidatModal from './DelMedKandidat/DelMedKandidatModal';
import useFiltrerteKandidater from './KandidatlisteFilter/useFiltrerteKandidater';
import SendSmsModal from './SendSMS/SendSmsModal';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import { Checkbox } from '@navikt/ds-react';
import { FC } from 'react';

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

  return (
    <div className='flex flex-row gap-4 items-baseline flex-wrap'>
      <Checkbox
        className='ml-5 '
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
          <div>
            <SendSmsModal
              markerteKandidater={markerteKandidater}
              fjernAllMarkering={() => setMarkerteKandidater([])}
            />
          </div>

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
        </>
      )}
    </div>
  );
};

export default KandidatlisteHandlingsRad;
