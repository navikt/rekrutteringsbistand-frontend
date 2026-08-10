'use client';
import { settOppMøteplan } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import type { MøtedagDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import MøteoppsettFelter from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/MøteoppsettFelter';
import {
  MøteoppsettFormSchema,
  tilFormValues,
  type MøteoppsettFormValues,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/møteoppsettSkjema';
import type { MøtedagOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/useMøtedagFane';
import { zodResolver } from '@hookform/resolvers/zod';
import { PencilIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  HStack,
  LocalAlert,
  VStack,
} from '@navikt/ds-react';
import { FC, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  rekrutteringstreffId: string;
  møtedag: MøtedagDTO;
  onMøtedagOppdatert: MøtedagOppdatering;
  deaktivert: boolean;
}

const Møteoppsettpanel: FC<Props> = ({
  rekrutteringstreffId,
  møtedag,
  onMøtedagOppdatert,
  deaktivert,
}) => {
  const [redigerer, setRedigerer] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);
  const redigerknappRef = useRef<HTMLButtonElement>(null);
  const skalGiFokusTilbake = useRef(false);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setFocus,
  } = useForm<MøteoppsettFormValues>({
    resolver: zodResolver(MøteoppsettFormSchema),
    defaultValues: tilFormValues(møtedag),
  });

  const startRedigering = () => {
    reset(tilFormValues(møtedag));
    setFeil(null);
    setRedigerer(true);
  };

  useEffect(() => {
    if (redigerer) {
      setFocus('starttidspunkt');
    } else if (skalGiFokusTilbake.current) {
      skalGiFokusTilbake.current = false;
      redigerknappRef.current?.focus();
    }
  }, [redigerer, setFocus]);

  const avslutt = () => {
    skalGiFokusTilbake.current = true;
    setRedigerer(false);
    setFeil(null);
  };

  const lagre = async (verdier: MøteoppsettFormValues) => {
    setFeil(null);
    try {
      const oppdatertMøtedag = await settOppMøteplan(
        rekrutteringstreffId,
        verdier,
      );
      await onMøtedagOppdatert(oppdatertMøtedag);
      avslutt();
    } catch {
      setFeil('Kunne ikke lagre møteoppsettet. Prøv igjen.');
    }
  };

  return (
    <Box background='neutral-soft' borderRadius='8' padding='space-12'>
      {redigerer ? (
        <form
          onSubmit={(hendelse) => void handleSubmit(lagre)(hendelse)}
          noValidate
        >
          <VStack gap='space-12'>
            <BodyShort>
              Tidene styrer bare timeplanen, ikke hvem som sitter hvor.
              Romfordelingen står urørt.
            </BodyShort>
            <MøteoppsettFelter register={register} errors={errors} />
            {feil && (
              <LocalAlert as='div' status='error'>
                <LocalAlert.Content>{feil}</LocalAlert.Content>
              </LocalAlert>
            )}
            <HStack gap='space-8' wrap>
              <Button type='submit' size='small' loading={isSubmitting}>
                Lagre endringer
              </Button>
              <Button
                type='button'
                size='small'
                variant='secondary'
                disabled={isSubmitting}
                onClick={avslutt}
              >
                Avbryt
              </Button>
            </HStack>
          </VStack>
        </form>
      ) : (
        <HStack gap='space-16' align='center' justify='space-between' wrap>
          <BodyShort>
            Møtene starter {møtedag.starttidspunkt} og varer{' '}
            {møtedag.varighetPerMøteMinutter} minutter hver.
          </BodyShort>
          <Button
            ref={redigerknappRef}
            type='button'
            variant='secondary'
            size='small'
            icon={<PencilIcon aria-hidden />}
            disabled={deaktivert}
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
