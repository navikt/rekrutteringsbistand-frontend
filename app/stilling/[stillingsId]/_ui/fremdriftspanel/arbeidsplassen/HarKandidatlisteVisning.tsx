import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { setKandidatlisteStatus } from '@/app/api/kandidat/setKandidatlisteStatus';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import PersonbrukerTekst from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/fullfør-stilling/PersonbrukerTekst';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import SWRLaster from '@/components/SWRLaster';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { BodyLong, Box, Button, Modal } from '@navikt/ds-react';
import { useState } from 'react';

export default function HarKandidatlisteVisning() {
  const { stillingsData, refetch, erEier } = useStillingsContext();
  const { visVarsel } = useApplikasjonContext();
  const [loading, setLoading] = useState(false);
  const kandidatlisteForEier = useKandidatlisteForEier(stillingsData, erEier);

  const [open, setOpen] = useState(false);

  const endreKandidatlisteStatus = async (
    kandidatlisteId: string,
    status: Kandidatlistestatus,
  ) => {
    setLoading(true);
    try {
      await setKandidatlisteStatus(kandidatlisteId, status);
      visVarsel({ type: 'success', tekst: 'Du har nå fullført oppdraget.' });

      kandidatlisteForEier.mutate();
      if (refetch) refetch();
    } catch (error) {
      visVarsel({
        type: 'error',
        tekst: 'Klarte ikke å endre status på oppdraget',
      });
      new RekbisError({ message: 'Klarte ikke å fullføre oppdrag', error });
    }
    setLoading(false);
  };

  return (
    <SWRLaster hooks={[kandidatlisteForEier]}>
      {(kandidatlisteForEier) => {
        const ikkeArkiverteKandidater =
          kandidatlisteForEier?.kandidater?.filter((k) => !k.arkivert) ?? [];

        const antallKandidaterSomHarFåttJobb =
          ikkeArkiverteKandidater.filter(
            (k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN,
          ).length +
          (kandidatlisteForEier?.formidlingerAvUsynligKandidat?.filter(
            (k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN,
          )?.length || 0);

        const antallStillinger = kandidatlisteForEier?.antallStillinger;
        const besatteStillinger = antallKandidaterSomHarFåttJobb;

        const ingenFåttJobben = besatteStillinger === 0;

        if (kandidatlisteForEier.status === Kandidatlistestatus.Lukket) {
          return (
            <Button
              size={'small'}
              loading={loading}
              onClick={() =>
                setKandidatlisteStatus(
                  kandidatlisteForEier.kandidatlisteId,
                  Kandidatlistestatus.Åpen,
                )
              }
            >
              Gjenåpne oppdraget
            </Button>
          );
        }

        return (
          <>
            <Button
              size={'small'}
              loading={loading}
              onClick={() => setOpen(true)}
            >
              Fullfør oppdraget
            </Button>
            <Modal
              width={600}
              open={open}
              onClose={() => setOpen(false)}
              header={{ heading: 'Fullfør oppdraget' }}
            >
              <Modal.Body>
                <BodyLong className='mb-3'>
                  {ingenFåttJobben
                    ? 'Ingen stillinger er besatt'
                    : `${besatteStillinger} av ${antallStillinger} 
                            ${antallStillinger === 1 ? 'stilling' : 'stillinger'} er
                            besatt.`}
                </BodyLong>
                <Box.New
                  borderRadius={'large'}
                  background='neutral-soft'
                  className='p-5'
                >
                  <BodyLong className=' font-bold'>
                    Dette skjer når du fullfører
                  </BodyLong>
                  {!ingenFåttJobben && <PersonbrukerTekst />}
                </Box.New>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type='button'
                  disabled={
                    loading ||
                    (kandidatlisteForEier.status ===
                      Kandidatlistestatus.Lukket &&
                      stillingsData.stilling.status === StillingsStatus.Stoppet)
                  }
                  onClick={() =>
                    kandidatlisteForEier.kandidatlisteId &&
                    endreKandidatlisteStatus(
                      kandidatlisteForEier.kandidatlisteId,
                      Kandidatlistestatus.Lukket,
                    )
                  }
                >
                  Fullfør
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
