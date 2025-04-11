import { useStillingsContext } from '../../StillingsContext';
import { useKandidatlisteContext } from '../KandidatlisteContext';
import DelMedArbeidsgiver from './DelMedArbeidsgiver/DelMedArbeidsgiver';
import DelMedKandidatModal from './DelMedKandidat/DelMedKandidatModal';
import SendSmsModal from './SendSMS/SendSmsModal';
import { Checkbox } from '@navikt/ds-react';
import * as React from 'react';

const KandidatlisteHandlingsRad: React.FC = () => {
  const {
    kandidatliste,
    lukketKandidatliste,
    markerteKandidater,
    setMarkerteKandidater,
  } = useKandidatlisteContext();
  const { erJobbmesse } = useStillingsContext();

  return (
    <div className='flex gap-4'>
      <Checkbox
        disabled={lukketKandidatliste}
        checked={
          markerteKandidater &&
          markerteKandidater.length === kandidatliste.kandidater.length
        }
        indeterminate={
          markerteKandidater &&
          markerteKandidater.length > 0 &&
          markerteKandidater.length !== kandidatliste.kandidater.length
        }
        onChange={() => {
          if (
            markerteKandidater &&
            setMarkerteKandidater &&
            markerteKandidater.length
          ) {
            setMarkerteKandidater([]);
          } else if (setMarkerteKandidater) {
            setMarkerteKandidater(
              kandidatliste.kandidater.filter((k) => k.fodselsnr !== null),
            );
          }
        }}
        hideLabel
      >
        Velg alle rader
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
      )}{' '}
    </div>
  );
};

export default KandidatlisteHandlingsRad;
