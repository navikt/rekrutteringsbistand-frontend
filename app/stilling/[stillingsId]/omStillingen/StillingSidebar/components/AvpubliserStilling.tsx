import { oppdaterStilling } from '../../../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { useApplikasjonContext } from '../../../../../providers/ApplikasjonContext';
import { StillingsStatus } from '../../../../stilling-typer';
import { stillingErUtløpt } from '../../../../stilling-util';
import { useStillingsContext } from '../../../StillingsContext';
import { ArrowUndoIcon, EyeSlashIcon } from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Button, Modal } from '@navikt/ds-react';
import * as React from 'react';

export interface AvpubliserStillingProps {
  children?: React.ReactNode | undefined;
}

const AvpubliserStilling: React.FC = () => {
  const ref = React.useRef<HTMLDialogElement>(null);

  const { valgtNavKontor, brukerData } = useApplikasjonContext();
  const { stillingsData, refetch } = useStillingsContext();
  const [loading, setLoading] = React.useState(false);
  const avpubliserStilling = async () => {
    setLoading(true);
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
    setLoading(false);

    refetch();
  };

  const erUtløpt = stillingErUtløpt(stillingsData.stilling);
  const stillingsStatus = stillingsData.stilling.status;

  return (
    <React.Fragment>
      <Button
        disabled={
          erUtløpt || loading || stillingsStatus === StillingsStatus.Stoppet
        }
        icon={<EyeSlashIcon />}
        variant='secondary'
        size='small'
        onClick={() => ref.current?.show()}
      >
        Avpubliser
      </Button>

      <Modal
        ref={ref}
        header={{
          heading: 'Avpubliser stillingsannonsen',
          size: 'small',
        }}
        width='medium'
      >
        <Modal.Body>
          <div className='flex gap-2 flex-col'>
            <BodyShort>Hva som skjer</BodyShort>
            <div className='flex gap-2'>
              <EyeSlashIcon />
              <BodyLong>
                Stillingsannonsen skjules for andre i rekrutteringsbistand.
              </BodyLong>
            </div>
            <div className='flex gap-2'>
              <ArrowUndoIcon />
              <BodyLong>
                Du kan publisere annonsen på nytt. Det gjør du ved å velge
                &quot;Rediger&quot; på annonsen og fullføre flyten.
              </BodyLong>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type='button' variant='danger' onClick={avpubliserStilling}>
            Avpubliser annonsen
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={() => ref.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AvpubliserStilling;
