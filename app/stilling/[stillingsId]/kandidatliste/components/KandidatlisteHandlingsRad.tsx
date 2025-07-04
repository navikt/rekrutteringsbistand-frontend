import { useStillingsContext } from '../../StillingsContext';
import { useKandidatlisteContext } from '../KandidatlisteContext';
import DelMedArbeidsgiver from './DelMedArbeidsgiver/DelMedArbeidsgiver';
import DelMedKandidatModal from './DelMedKandidat/DelMedKandidatModal';
import useFiltrerteKandidater from './KandidatlisteFilter/useFiltrerteKandidater';
import SendSmsModal from './SendSMS/SendSmsModal';
import { Checkbox } from '@navikt/ds-react';
import * as React from 'react';

const KandidatlisteHandlingsRad: React.FC = () => {
  const {
    kandidater,
    lukketKandidatliste,
    markerteKandidater,
    setMarkerteKandidater,
  } = useKandidatlisteContext();
  const { erJobbmesse } = useStillingsContext();

  // filtrerteKandidater
  const filtrerteKandidater = useFiltrerteKandidater();

  return (
    <div className='flex gap-4'>
      <Checkbox
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
        <div>
          <SendSmsModal
            markerteKandidater={markerteKandidater}
            fjernAllMarkering={() => setMarkerteKandidater([])}
          />

          {!erJobbmesse && (
            <>
              <DelMedKandidatModal
                markerteKandidater={markerteKandidater}
                fjernAllMarkering={() => setMarkerteKandidater([])}
              />
              <DelMedArbeidsgiver markerteKandidater={markerteKandidater} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default KandidatlisteHandlingsRad;
