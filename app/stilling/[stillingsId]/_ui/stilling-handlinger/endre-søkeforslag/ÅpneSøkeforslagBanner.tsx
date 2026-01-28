'use client';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { useEndreSøkeforslag } from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/endre-søkeforslag/useEndreSøkeforslag';
import {
  AdminStatus,
  StillingsStatus,
} from '@/app/stilling/_ui/stilling-typer';
import { VisningsStatus } from '@/app/stilling/_util/stillingInfoUtil';
import { PlayIcon } from '@navikt/aksel-icons';
import { Box, Button, Checkbox, Dialog } from '@navikt/ds-react';
import { useState } from 'react';

export default function AapneSoekeforslagBanner() {
  const { stillingsData, omStilling } = useStillingsContext();
  const { endreSøkeforslag } = useEndreSøkeforslag();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [publiserArbeidsplassen, setPubliserArbeidsplassen] = useState(false);

  const kanPubliseresEksternt =
    stillingsData?.stilling?.properties?.applicationurl != null ||
    stillingsData?.stilling?.properties?.applicationemail != null;

  const håndterÅpneSøkeforslag = async () => {
    setLoading(true);
    try {
      await endreSøkeforslag({
        status: StillingsStatus.Aktiv,
        adminStatus: AdminStatus.Done,
        publiserArbeidsplassen,
      });
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  if (omStilling.visningsStatus !== VisningsStatus.IkkePublisert) {
    return null;
  }

  return (
    <Box background='info-soft' borderRadius='12' padding='space-16'>
      <Button
        size='small'
        variant='primary'
        icon={<PlayIcon />}
        onClick={() => setOpen(true)}
      >
        Slå på søkerforslag
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Popup>
          <Dialog.Header>
            <Dialog.Title>Åpne søkerforslag</Dialog.Title>
            <Dialog.Description>
              Du er i ferd med å åpne for søkerforslag. Andre kan da foreslå
              jobbsøkere til dette oppdraget.
            </Dialog.Description>
          </Dialog.Header>
          {kanPubliseresEksternt && (
            <Dialog.Body>
              <Checkbox
                checked={publiserArbeidsplassen}
                onChange={(e) => setPubliserArbeidsplassen(e.target.checked)}
              >
                Publiser stillingsoppdraget offentlig på arbeidsplassen.no også
              </Checkbox>
            </Dialog.Body>
          )}
          <Dialog.Footer>
            <Button
              variant='primary'
              icon={<PlayIcon />}
              loading={loading}
              onClick={håndterÅpneSøkeforslag}
            >
              Åpne søkerforslag
            </Button>
            <Dialog.CloseTrigger>
              <Button variant='secondary'>Avbryt</Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
        </Dialog.Popup>
      </Dialog>
    </Box>
  );
}
