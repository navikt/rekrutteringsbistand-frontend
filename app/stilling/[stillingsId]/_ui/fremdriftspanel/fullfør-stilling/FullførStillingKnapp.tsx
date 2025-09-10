import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { setKandidatlisteStatus } from '@/app/api/kandidat/setKandidatlisteStatus';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import FullførOppdragTekst from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/fullfør-stilling/FullførOppdragTekst';
import PersonbrukerTekst from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/fullfør-stilling/PersonbrukerTekst';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import SWRLaster from '@/components/SWRLaster';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { TasklistIcon } from '@navikt/aksel-icons';
import { BodyLong, Box, Button, Modal } from '@navikt/ds-react';
import { useState } from 'react';

export default function FullførStillingKnapp() {
  // Bruk kontrollert state i stedet for dialog.show() for å sikre korrekt backdrop (spesielt i Windows)
  const [open, setOpen] = useState(false);
  const { stillingsData, refetch, erEier } = useStillingsContext();
  const { valgtNavKontor, brukerData, visVarsel } = useApplikasjonContext();
  const [loading, setLoading] = useState(false);
  const kandidatlisteForEier = useKandidatlisteForEier(stillingsData, erEier);

  const stillingsStatus = stillingsData.stilling.status;

  const avsluttStilling = async (kandidatlisteId: string) => {
    setLoading(true);
    try {
      await Promise.all([
        setKandidatlisteStatus(kandidatlisteId, Kandidatlistestatus.Lukket),
        oppdaterStilling(
          {
            ...stillingsData,
            stilling: {
              ...stillingsData.stilling,
              status: StillingsStatus.Stoppet,
            },
          },
          {
            eierNavident: brukerData.ident,
            eierNavn: brukerData.navn,
            eierNavKontorEnhetId: valgtNavKontor?.navKontor,
          },
        ),
      ]);
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
    setOpen(false);
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
        return (
          <>
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
                  <FullførOppdragTekst />
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
                      stillingsStatus === StillingsStatus.Stoppet)
                  }
                  onClick={() =>
                    kandidatlisteForEier.kandidatlisteId &&
                    avsluttStilling(kandidatlisteForEier.kandidatlisteId)
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

            <Button
              onClick={() => setOpen(true)}
              disabled={
                loading ||
                kandidatlisteForEier.status !== Kandidatlistestatus.Åpen ||
                !kandidatlisteForEier.kandidatlisteId
              }
              variant='secondary'
              size='small'
              className='h-5 w-full'
              icon={<TasklistIcon />}
            >
              Fullfør
            </Button>
          </>
        );
      }}
    </SWRLaster>
  );
}
