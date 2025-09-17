'use client';

import { useStegviser } from './StegviserContext';
import {
  publiserRekrutteringstreff,
  fullførRekrutteringstreff,
  gjenåpnRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/[...slug]/steg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { EyeIcon } from '@navikt/aksel-icons';
import {
  Button,
  Heading,
  ProgressBar,
  Modal,
  BodyShort,
  Box,
} from '@navikt/ds-react';
import { FC, useRef, useState } from 'react';

interface Props {
  stepDetails: { id: number; header: string }[];
  onToggleForhåndsvisning?: (erIForhåndsvisning: boolean) => void;
  erIForhåndsvisning: boolean;
}

const StegviserHeader: FC<Props> = ({
  stepDetails,
  onToggleForhåndsvisning,
  erIForhåndsvisning,
}) => {
  const fullforModalRef = useRef<HTMLDialogElement>(null);
  const publiserModalRef = useRef<HTMLDialogElement>(null);
  const [publiserer, setPubliserer] = useState(false);
  const [fullfører, setFullfører] = useState(false);
  const [gjenåpner, setGjenåpner] = useState(false);

  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { mutate: mutateRekrutteringstreff } =
    useRekrutteringstreff(rekrutteringstreffId);

  const {
    activeStep,
    erPubliseringklar,
    harInvitert,
    sjekklistePunkterFullfort,
    totaltAntallSjekklistePunkter,
    inviterePunkterFullfort,
    totaltAntallInviterePunkter,
    arrangementtidspunktHarPassert,
    tiltidspunktHarPassert,
  } = useStegviser();

  const onPubliserTreffet = async () => {
    setPubliserer(true);
    try {
      await publiserRekrutteringstreff(rekrutteringstreffId);
      await mutateRekrutteringstreff();
    } catch (error) {
      new RekbisError({
        message: 'Publisering av rekrutteringstreff feilet',
        error,
      });
    } finally {
      setPubliserer(false);
    }
  };

  const onFullførRekrutteringstreff = async () => {
    setFullfører(true);
    try {
      await fullførRekrutteringstreff(rekrutteringstreffId);
      await mutateRekrutteringstreff();
    } catch (error) {
      new RekbisError({
        message: 'Avslutting av rekrutteringstreff feilet',
        error,
      });
    } finally {
      setFullfører(false);
    }
  };

  const onGjenåpnTreffet = async () => {
    setGjenåpner(true);
    try {
      await gjenåpnRekrutteringstreff(rekrutteringstreffId);
      await mutateRekrutteringstreff();
    } catch (error) {
      new RekbisError({
        message: 'Gjenåpning av rekrutteringstreff feilet',
        error,
      });
    } finally {
      setGjenåpner(false);
    }
  };

  const currentHeader =
    stepDetails.find((d) => d.id === activeStep)?.header ?? 'Steg';

  const getProsent = (value: number, max: number) =>
    max === 0 ? 0 : (value / max) * 100;

  const ProgressMedTeller: FC<{
    value: number;
    max: number;
    ariaLabel: string;
  }> = ({ value, max, ariaLabel }) => (
    <>
      <ProgressBar
        value={getProsent(value, max)}
        size='small'
        className='mt-2'
        aria-label={ariaLabel}
      />
      <div className='flex justify-end text-sm tabular-nums mt-1'>
        {value} / {max}
      </div>
    </>
  );

  const handleToggleForhåndsvisning = () => {
    onToggleForhåndsvisning?.(!erIForhåndsvisning);
  };

  const onKlikkFullfor = () => {
    if (!tiltidspunktHarPassert) {
      fullforModalRef.current?.showModal();
    } else {
      onFullførRekrutteringstreff();
    }
  };

  return (
    <div className='w-full'>
      <div className='grid grid-cols-2 gap-2 w-full'>
        {activeStep != 3 && (
          <Button
            size='small'
            variant='secondary'
            className='w-full'
            onClick={handleToggleForhåndsvisning}
          >
            {erIForhåndsvisning ? 'Rediger' : 'Forhåndsvis'}
          </Button>
        )}
        {activeStep === 1 ? (
          <Button
            disabled={!erPubliseringklar || publiserer}
            loading={publiserer}
            size='small'
            className='w-full'
            onClick={() => publiserModalRef.current?.showModal()}
          >
            Publiser treffet
          </Button>
        ) : (
          activeStep === 2 && (
            <Button
              variant='primary'
              size='small'
              disabled={!harInvitert || fullfører}
              loading={fullfører}
              className='w-full'
              onClick={onKlikkFullfor}
            >
              Fullfør
            </Button>
          )
        )}
      </div>
      {activeStep === 3 && (
        <Button
          variant='primary'
          size='small'
          loading={gjenåpner}
          className='w-full'
          onClick={onGjenåpnTreffet}
        >
          Gjenåpne
        </Button>
      )}

      <div className='flex items-center justify-between w-full mt-12'>
        <div className='flex-grow mr-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <Heading size='small'>{currentHeader}</Heading>
            </div>
            <div />
          </div>

          <div>
            {activeStep === 1 && (
              <ProgressMedTeller
                value={sjekklistePunkterFullfort}
                max={totaltAntallSjekklistePunkter}
                ariaLabel='Fremdrift for publisering'
              />
            )}
            {activeStep === 2 && (
              <ProgressMedTeller
                value={inviterePunkterFullfort}
                max={totaltAntallInviterePunkter}
                ariaLabel='Fremdrift for invitasjon'
              />
            )}
          </div>
        </div>
      </div>

      <Modal
        ref={fullforModalRef}
        header={{ heading: 'Fullfør rekrutteringstreff?' }}
      >
        <Modal.Body>
          <p>
            Slutttidspunktet for rekrutteringstreffet har ikke passert ennå. Er
            du sikker på at du vil fullføre rekrutteringsreffet likevel?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            loading={fullfører}
            onClick={() => {
              onFullførRekrutteringstreff();
              fullforModalRef.current?.close();
            }}
          >
            Fullfør
          </Button>
          <Button
            variant='secondary'
            onClick={() => fullforModalRef.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal ref={publiserModalRef} header={{ heading: 'Publiser treffet' }}>
        <Modal.Body>
          <div className='bg-bg-subtle p-4 rounded-md'>
            <Box.New>
              <BodyShort className='font-bold'>
                Dette skjer når du publiserer treffet
              </BodyShort>
              <div className='flex items-center gap-2 mt-4'>
                <EyeIcon fontSize='1.5rem' aria-hidden />
                <BodyShort className='flex-1'>
                  Treffet blir synlig for:
                </BodyShort>
              </div>
              <ul className='list-disc pl-16  mt-1'>
                <li>Nav-ansatte i rekrutteringsbistand.</li>
                <li>Nav brukere som blir invitert via aktivitetsplanen.</li>
              </ul>
            </Box.New>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            loading={publiserer}
            onClick={async () => {
              publiserModalRef.current?.close();
              await onPubliserTreffet();
            }}
          >
            Publiser
          </Button>
          <Button
            variant='secondary'
            onClick={() => publiserModalRef.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StegviserHeader;
