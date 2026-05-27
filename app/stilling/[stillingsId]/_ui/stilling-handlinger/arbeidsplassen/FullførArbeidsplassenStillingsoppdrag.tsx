import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { setKandidatlisteStatus } from '@/app/api/kandidat/setKandidatlisteStatus';
import { useKandidlisteKandidater } from '@/app/api/kandidat/useKandidlisteKandidater';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import PersonbrukerTekst from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/fullfør-oppdrag/PersonbrukerTekst';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import SWRLaster from '@/components/SWRLaster';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { BodyLong, Box, Button, Modal } from '@navikt/ds-react';
import { useState } from 'react';

export default function FullførArbeidsplassenStillingsoppdrag() {
  const {
    stillingsData,
    erEier,
    kandidatlisteInfo,
    omStilling,
    refetchKandidatlisteInfo,
  } = useStillingsContext();
  const { visVarsel } = useApplikasjonContext();
  const [loading, setLoading] = useState(false);

  const kandidatlisteForEier = useKandidlisteKandidater(stillingsData, erEier, {
    antallPerSide: 500,
  });

  const [open, setOpen] = useState(false);

  const endreKandidatlisteStatus = async (
    kandidatlisteId: string,
    status: Kandidatlistestatus,
  ) => {
    setLoading(true);
    try {
      await setKandidatlisteStatus(kandidatlisteId, status);
      visVarsel({ type: 'success', tekst: 'Du har nå fullført oppdraget.' });
    } catch (error) {
      visVarsel({
        type: 'error',
        tekst: 'Klarte ikke å endre status på oppdraget',
      });
      new RekbisError({ message: 'Klarte ikke å fullføre oppdrag', error });
    } finally {
      setLoading(false);
      setOpen(false);
      refetchKandidatlisteInfo?.();
    }
  };

  if (kandidatlisteInfo?.kandidatlisteStatus !== Kandidatlistestatus.Åpen) {
    return null;
  }

  return (
    <SWRLaster skjulFeilmelding hooks={[kandidatlisteForEier]}>
      {(kandidatlisteForEier) => {
        const ikkeArkiverteKandidater =
          kandidatlisteForEier?.kandidatPersoner
            ?.map((p) => p.kandidat)
            .filter((k): k is NonNullable<typeof k> => k !== null)
            .filter((k) => !k.arkivert) ?? [];

        const antallKandidaterSomHarFåttJobb =
          ikkeArkiverteKandidater.filter(
            (k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN,
          ).length +
          (kandidatlisteForEier?.kandidatPersoner
            ?.map((p) => p.formidlingerAvUsynligKandidat)
            .filter((f): f is NonNullable<typeof f> => f !== null)
            .filter((k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN)
            ?.length || 0);

        const antallStillinger = omStilling.antallStillinger;
        const besatteStillinger = antallKandidaterSomHarFåttJobb;

        const ingenFåttJobben = besatteStillinger === 0;

        return (
          <>
            <Button
              size={'small'}
              variant={'tertiary'}
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
                <Box borderRadius='8' background='neutral-soft' className='p-5'>
                  <BodyLong className='font-bold'>
                    Dette skjer når du fullfører
                  </BodyLong>
                  {!ingenFåttJobben && <PersonbrukerTekst />}
                </Box>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type='button'
                  disabled={
                    loading ||
                    (kandidatlisteInfo?.kandidatlisteStatus ===
                      Kandidatlistestatus.Lukket &&
                      stillingsData.stilling.status === StillingsStatus.Stoppet)
                  }
                  onClick={() =>
                    kandidatlisteInfo?.kandidatlisteId &&
                    endreKandidatlisteStatus(
                      kandidatlisteInfo?.kandidatlisteId,
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
