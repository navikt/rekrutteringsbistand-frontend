import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { setKandidatlisteStatus } from '@/app/api/kandidat/setKandidatlisteStatus';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import FullførOppdragTekst from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/fullfør-stilling/FullførOppdragTekst';
import PersonbrukerTekst from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/fullfør-stilling/PersonbrukerTekst';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import {
  AdminStatus,
  StillingsStatus,
} from '@/app/stilling/_ui/stilling-typer';
import SWRLaster from '@/components/SWRLaster';
import IkonNavnAvatar from '@/components/ui/IkonNavnAvatar';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import { UmamiEvent } from '@/util/umamiEvents';
import {
  BodyLong,
  BodyShort,
  Box,
  Button,
  Modal,
  ReadMore,
} from '@navikt/ds-react';
import { FC, useState } from 'react';

interface FullførStillingModalProps {
  setVisModal: () => void;
}

export default function FullførStillingModal({
  setVisModal,
}: FullførStillingModalProps) {
  // Bruk kontrollert state i stedet for dialog.show() for å sikre korrekt backdrop (spesielt i Windows)
  const { stillingsData, erEier } = useStillingsContext();
  const { track } = useUmami();

  const kandidatlisteForEier = useKandidatlisteForEier(stillingsData, erEier);

  return (
    <SWRLaster hooks={[kandidatlisteForEier]}>
      {(kandidatlisteForEier) => {
        const ikkeArkiverteKandidater =
          kandidatlisteForEier?.kandidater?.filter((k) => !k.arkivert) ?? [];

        const kandidaterSomHarFåttJobb =
          ikkeArkiverteKandidater
            .filter((k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN)
            .map((k) => `${k.fornavn} ${k.etternavn}`) || [];

        const usynligeKandidaterSomHarFåttJobb =
          kandidatlisteForEier?.formidlingerAvUsynligKandidat
            ?.filter((k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN)
            .map((k) => `${k.fornavn} ${k.etternavn}`) || [];

        const antallKandidaterSomHarFåttJobb =
          (kandidaterSomHarFåttJobb?.length || 0) +
          (usynligeKandidaterSomHarFåttJobb?.length || 0);

        const antallStillinger = kandidatlisteForEier?.antallStillinger;
        track(UmamiEvent.Stilling.åpne_fullfør_stilling_modal);

        return (
          <FullførStillingModalVisning
            antallStillinger={antallStillinger}
            antallKandidaterSomHarFåttJobb={antallKandidaterSomHarFåttJobb}
            onClose={setVisModal}
            kandidaterSomHarFåttJobb={kandidaterSomHarFåttJobb.concat(
              usynligeKandidaterSomHarFåttJobb,
            )}
            kandidatlisteId={kandidatlisteForEier.kandidatlisteId}
          />
        );
      }}
    </SWRLaster>
  );
}

interface FullførStillingModalVisningProps {
  antallStillinger: number;
  antallKandidaterSomHarFåttJobb: number;
  onClose: () => void;
  kandidaterSomHarFåttJobb: string[];
  kandidatlisteId: string;
}

function FullførStillingModalVisning({
  antallStillinger,
  antallKandidaterSomHarFåttJobb,
  kandidaterSomHarFåttJobb,
  onClose,
  kandidatlisteId,
}: FullførStillingModalVisningProps) {
  const { valgtNavKontor, brukerData, visVarsel } = useApplikasjonContext();
  const { stillingsData, refetch, erEier } = useStillingsContext();
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
            administration: {
              ...stillingsData.stilling.administration,
              status: AdminStatus.Done,
            },
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
    } catch (error) {
      visVarsel({
        type: 'error',
        tekst: 'Klarte ikke å endre status på oppdraget',
      });
      new RekbisError({ message: 'Klarte ikke å fullføre oppdrag', error });
    }
    setLoading(false);
    onClose();
  };

  return (
    <Modal
      width={600}
      open={true}
      onClose={onClose}
      header={{ heading: 'Fullfør oppdraget' }}
    >
      <Modal.Body>
        <BodyLong className='mb-3'>
          {antallKandidaterSomHarFåttJobb === 0
            ? 'Ingen stillinger er besatt'
            : `${antallKandidaterSomHarFåttJobb} av ${antallStillinger} 
                  ${antallStillinger === 1 ? 'stilling' : 'stillinger'} er
                  besatt.`}
        </BodyLong>
        {antallKandidaterSomHarFåttJobb > 5 && (
          <ReadMore header='Disse jobbsøkerne er blitt ansatt'>
            {kandidaterSomHarFåttJobb?.map((kandidat, index) => (
              <JobbsøkerBoxMedInitialIkon kandidat={kandidat} key={index} />
            ))}
          </ReadMore>
        )}
        {antallKandidaterSomHarFåttJobb <= 5 &&
          kandidaterSomHarFåttJobb?.map((kandidat, index) => (
            <JobbsøkerBoxMedInitialIkon kandidat={kandidat} key={index} />
          ))}
        <Box borderRadius='8' background='neutral-soft' className='p-5'>
          <BodyLong className='font-bold'>
            Dette skjer når du fullfører:
          </BodyLong>
          <FullførOppdragTekst />
          {antallKandidaterSomHarFåttJobb !== 0 && <PersonbrukerTekst />}
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type='button'
          disabled={loading}
          onClick={() => avsluttStilling(kandidatlisteId)}
        >
          Fullfør
        </Button>
        <Button type='button' variant='secondary' onClick={onClose}>
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
interface JobbsøkerBoxMedInitialIkonProps {
  kandidat: string;
}

const JobbsøkerBoxMedInitialIkon: FC<JobbsøkerBoxMedInitialIkonProps> = ({
  kandidat,
}) => {
  return (
    <Box borderRadius='8' background='neutral-soft' className='mb-2 p-2'>
      <div className={'flex items-center gap-2'}>
        <IkonNavnAvatar fulltNavn={kandidat} />
        <BodyShort>{kandidat}</BodyShort>
      </div>
    </Box>
  );
};
