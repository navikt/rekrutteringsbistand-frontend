'use client';
import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import Feilvarsel from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/Feilvarsel';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import MøteoppsettFelter from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/MøteoppsettFelter';
import { tilMøteoppsettSkjemaverdier } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/møteoppsettSkjema';
import { useMøteoppsettSkjema } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/useMøteoppsettSkjema';
import { PencilIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, HStack, VStack } from '@navikt/ds-react';
import { FC, useEffect, useRef, useState } from 'react';

interface Props {
  rekrutteringstreffId: string;
  treffgjennomføring: TreffgjennomføringDTO;
  oppdatering: TreffgjennomføringOppdatering;
  onLagringsstatusEndret: (lagrer: boolean) => void;
  deaktivert: boolean;
}

const Møteoppsettpanel: FC<Props> = ({
  rekrutteringstreffId,
  treffgjennomføring,
  oppdatering,
  onLagringsstatusEndret,
  deaktivert,
}) => {
  const [redigerer, setRedigerer] = useState(false);
  const redigerknappRef = useRef<HTMLButtonElement>(null);
  const skalGiFokusTilbake = useRef(false);

  const lukkRedigering = () => {
    skalGiFokusTilbake.current = true;
    setRedigerer(false);
  };

  const { skjema, feil, nullstillFeil, lagre } = useMøteoppsettSkjema({
    rekrutteringstreffId,
    treffgjennomføring,
    oppdatering,
    onLagringsstatusEndret,
    feilmelding: 'Kunne ikke lagre møteoppsettet. Prøv igjen.',
    onLagret: lukkRedigering,
  });
  const {
    formState: { errors, isSubmitting },
    register,
    reset,
    setFocus,
  } = skjema;
  const skjemaDeaktivert = deaktivert || isSubmitting;

  const startRedigering = () => {
    reset(tilMøteoppsettSkjemaverdier(treffgjennomføring));
    nullstillFeil();
    setRedigerer(true);
  };

  const avbryt = () => {
    lukkRedigering();
    nullstillFeil();
  };

  useEffect(() => {
    if (redigerer) {
      setFocus('starttidspunkt');
    } else if (skalGiFokusTilbake.current) {
      skalGiFokusTilbake.current = false;
      redigerknappRef.current?.focus();
    }
  }, [redigerer, setFocus]);

  return (
    <Box background='neutral-soft' borderRadius='8' padding='space-12'>
      {redigerer ? (
        <form onSubmit={(hendelse) => void lagre(hendelse)} noValidate>
          <VStack gap='space-12'>
            <BodyShort>
              Tidene styrer bare timeplanen, ikke hvem som sitter hvor.
              Romfordelingen står urørt.
            </BodyShort>
            <MøteoppsettFelter
              register={register}
              errors={errors}
              deaktivert={skjemaDeaktivert}
            />
            {feil && <Feilvarsel>{feil}</Feilvarsel>}
            <HStack gap='space-8' wrap>
              <Button
                type='submit'
                size='small'
                loading={isSubmitting}
                disabled={skjemaDeaktivert}
              >
                Lagre endringer
              </Button>
              <Button
                type='button'
                size='small'
                variant='secondary'
                disabled={skjemaDeaktivert}
                onClick={avbryt}
              >
                Avbryt
              </Button>
            </HStack>
          </VStack>
        </form>
      ) : (
        <HStack gap='space-16' align='center' justify='space-between' wrap>
          <BodyShort>
            Møtene starter {treffgjennomføring.starttidspunkt} og varer{' '}
            {treffgjennomføring.varighetPerMøteMinutter} minutter hver.
          </BodyShort>
          <Button
            ref={redigerknappRef}
            type='button'
            variant='secondary'
            size='small'
            icon={<PencilIcon aria-hidden />}
            disabled={skjemaDeaktivert}
            onClick={startRedigering}
          >
            Rediger møteoppsett
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default Møteoppsettpanel;
