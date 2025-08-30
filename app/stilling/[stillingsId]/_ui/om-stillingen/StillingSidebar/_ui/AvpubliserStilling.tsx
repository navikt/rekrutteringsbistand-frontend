import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import { stillingErUtløpt } from '@/app/stilling/_util/stilling-util';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { ArrowUndoIcon, EyeSlashIcon } from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Button, Modal } from '@navikt/ds-react';
import { Fragment, useRef, useState, type FC } from 'react';

const AvpubliserStilling: FC = () => {
  const ref = useRef<HTMLDialogElement>(null);

  const { valgtNavKontor, brukerData } = useApplikasjonContext();
  const { stillingsData, refetch } = useStillingsContext();
  const [loading, setLoading] = useState(false);
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

    if (refetch) {
      refetch();
    }
  };

  const erUtløpt = stillingErUtløpt(stillingsData.stilling);
  const stillingsStatus = stillingsData.stilling.status;

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default AvpubliserStilling;
