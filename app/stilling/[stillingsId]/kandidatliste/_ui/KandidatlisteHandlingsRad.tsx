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
    lukketKandidatliste,
    markerteKandidater,
    setMarkerteKandidater,
    alleKandidatnr,
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
          markerteKandidater &&
          alleKandidatnr.length > 0 &&
          markerteKandidater.length === alleKandidatnr.length
        }
        indeterminate={
          markerteKandidater &&
          markerteKandidater.length > 0 &&
          markerteKandidater.length !== alleKandidatnr.length
        }
        onChange={() => {
          const kandidaterPåSiden =
            filtrerteKandidater?.kandidater?.filter(
              (k) => k.fodselsnr !== null,
            ) ?? [];
          const allePåSidenErMarkert =
            kandidaterPåSiden.length > 0 &&
            kandidaterPåSiden.every((k) =>
              markerteKandidater.some((m) => m.fodselsnr === k.fodselsnr),
            );

          if (allePåSidenErMarkert) {
            setMarkerteKandidater([]);
          } else {
            const eksisterendeFnr = new Set(
              markerteKandidater.map((k) => k.fodselsnr),
            );
            const nye = kandidaterPåSiden.filter(
              (k) => !eksisterendeFnr.has(k.fodselsnr),
            );
            setMarkerteKandidater([...markerteKandidater, ...nye]);
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
    </div>
  );
};

export default KandidatlisteHandlingsRad;
