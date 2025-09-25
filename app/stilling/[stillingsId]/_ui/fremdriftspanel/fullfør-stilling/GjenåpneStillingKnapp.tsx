import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { setKandidatlisteStatus } from '@/app/api/kandidat/setKandidatlisteStatus';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import {
  Stillingskategori,
  StillingsStatus,
} from '@/app/stilling/_ui/stilling-typer';
import SWRLaster from '@/components/SWRLaster';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { BodyLong, Button, Checkbox, Modal } from '@navikt/ds-react';
import { useState } from 'react';

export default function GjenåpneStillingKnapp() {
  const { stillingsData, refetch, erEier } = useStillingsContext();
  const { valgtNavKontor, brukerData, visVarsel } = useApplikasjonContext();
  const kandidatlisteForEier = useKandidatlisteForEier(stillingsData, erEier);
  const [loading, setLoading] = useState(false);

  const [publiserArbeidsplassen, setPubliserArbeidsplassen] = useState(false);

  const [open, setOpen] = useState(false);

  const gjenåpne = async (kandidatlisteId: string) => {
    setLoading(true);
    try {
      await Promise.all([
        setKandidatlisteStatus(kandidatlisteId, Kandidatlistestatus.Åpen),
        oppdaterStilling(
          {
            ...stillingsData,
            stilling: {
              ...stillingsData.stilling,
              status: StillingsStatus.Aktiv,
              privacy: publiserArbeidsplassen
                ? 'SHOW_ALL'
                : 'INTERNAL_NOT_SHOWN',
            },
          },
          {
            eierNavident: brukerData.ident,
            eierNavn: brukerData.navn,
            eierNavKontorEnhetId: valgtNavKontor?.navKontor,
          },
        ),
      ]);
      visVarsel({ type: 'success', tekst: 'Oppdraget gjenåpnet.' });
      refetch?.();
      kandidatlisteForEier.mutate();
    } catch (error) {
      visVarsel({
        type: 'error',
        tekst: 'Klarte ikke å endre status på oppdraget',
      });
      new RekbisError({ message: 'Klarte ikke å gjenåpne oppdrag', error });
    }
    setLoading(false);
  };

  return (
    <SWRLaster hooks={[kandidatlisteForEier]}>
      {(kandidatlisteForEier) => {
        return (
          <>
            <Button
              loading={loading}
              size='small'
              className='w-full'
              onClick={() => setOpen(true)}
            >
              Gjenåpne
            </Button>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              header={{
                heading: 'Gjenåpne stillingsoppdrag',
                size: 'small',
                closeButton: false,
              }}
              width='small'
            >
              {stillingsData?.stillingsinfo?.stillingskategori !==
                Stillingskategori.Formidling &&
                (stillingsData?.stilling?.properties?.applicationurl !== null ||
                  stillingsData?.stilling?.properties?.applicationemail !==
                    null) && (
                  <Modal.Body>
                    <BodyLong>
                      <Checkbox
                        checked={publiserArbeidsplassen}
                        onChange={(e) =>
                          setPubliserArbeidsplassen(e.target.checked)
                        }
                      >
                        Publiser stillingsoppdraget offentlig på
                        arbeidsplassen.no også
                      </Checkbox>
                    </BodyLong>
                  </Modal.Body>
                )}
              <Modal.Footer>
                <Button
                  type='button'
                  onClick={() => gjenåpne(kandidatlisteForEier.kandidatlisteId)}
                >
                  Gjenåpne
                </Button>
                <Button
                  type='button'
                  variant='secondary'
                  onClick={() => setOpen(false)}
                >
                  Avbryt
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }}
    </SWRLaster>
  );
}
