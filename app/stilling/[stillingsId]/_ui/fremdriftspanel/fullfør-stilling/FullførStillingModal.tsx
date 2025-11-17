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
import { BodyLong, BodyShort, Box, Button, Modal } from '@navikt/ds-react';
import { useState } from 'react';

export interface FullførStillingModalProps {
  setVisModal: (val: boolean) => void;
}

export default function FullførStillingModal({
  setVisModal,
}: FullførStillingModalProps) {
  // Bruk kontrollert state i stedet for dialog.show() for å sikre korrekt backdrop (spesielt i Windows)
  const { stillingsData, refetch, erEier } = useStillingsContext();
  const { valgtNavKontor, brukerData, visVarsel } = useApplikasjonContext();
  const [loading, setLoading] = useState(false);
  const kandidatlisteForEier = useKandidatlisteForEier(stillingsData, erEier);

  const avsluttStilling = async (kandidatlisteId: string) => {
    setLoading(true);
    try {
      await setKandidatlisteStatus(kandidatlisteId, Kandidatlistestatus.Lukket);
      await oppdaterStilling(
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
      );
      visVarsel({ type: 'success', tekst: 'Du har nå fullført oppdraget.' });
      refetch?.();
      await kandidatlisteForEier.mutate();
      if (refetch) refetch();
    } catch (error) {
      visVarsel({
        type: 'error',
        tekst: 'Klarte ikke å endre status på oppdraget',
      });
      new RekbisError({ message: 'Klarte ikke å fullføre oppdrag', error });
    }
    setLoading(false);
    setVisModal(false);
  };

  return (
    <SWRLaster hooks={[kandidatlisteForEier]}>
      {(kandidatlisteForEier) => {
        const ikkeArkiverteKandidater =
          kandidatlisteForEier?.kandidater?.filter((k) => !k.arkivert) ?? [];

        const kandidaterSomHarFåttJobb = ikkeArkiverteKandidater.filter(
          (k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN,
        );
        const usynligeKandidaterSomHarFåttJobb =
          kandidatlisteForEier?.formidlingerAvUsynligKandidat?.filter(
            (k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN,
          );

        const antallKandidaterSomHarFåttJobb =
          (kandidaterSomHarFåttJobb?.length || 0) +
          (usynligeKandidaterSomHarFåttJobb?.length || 0);

        const antallStillinger = kandidatlisteForEier?.antallStillinger;
        const besatteStillinger = antallKandidaterSomHarFåttJobb;

        const ingenFåttJobben = besatteStillinger === 0;
        return (
          <>
            <Modal
              width={600}
              open={true}
              onClose={() => setVisModal(false)}
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
                {kandidaterSomHarFåttJobb?.map((kandidat, index) => (
                  <Box.New
                    borderRadius={'large'}
                    background='neutral-soft'
                    className='px-5 py-2 mb-2'
                    key={index}
                  >
                    <BodyShort>
                      {kandidat.etternavn}, {kandidat.fornavn}
                    </BodyShort>
                  </Box.New>
                ))}
                {usynligeKandidaterSomHarFåttJobb?.map((kandidat, index) => (
                  <Box.New
                    borderRadius={'large'}
                    background='neutral-soft'
                    className='px-5 py-2 mb-2'
                    key={index}
                  >
                    <BodyShort>
                      {kandidat.etternavn}, {kandidat.fornavn}
                    </BodyShort>
                  </Box.New>
                ))}
                <Box.New
                  borderRadius={'large'}
                  background='neutral-soft'
                  className='p-5'
                >
                  <BodyLong className=' font-bold'>
                    Dette skjer når du fullfører:
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
                      stillingsData.stilling.status === StillingsStatus.Stoppet)
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
                  onClick={() => setVisModal(false)}
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
