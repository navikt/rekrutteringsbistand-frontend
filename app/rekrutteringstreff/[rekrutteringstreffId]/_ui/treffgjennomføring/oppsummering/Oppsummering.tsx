import { useFormidlingerForTreffgjennomføring } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import StegHeader from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/StegHeader';
import type { StegBasisProps } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/Stegnavigasjon';
import OppsummeringNøkkeltall from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/oppsummering/OppsummeringNøkkeltall';
import OppsummeringPerArbeidsgiver from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/oppsummering/OppsummeringPerArbeidsgiver';
import { lagOppsummering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/oppsummering/lagOppsummering';
import { lagVurderingsoversikt } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/vurderingOgOppfølging/vurderingsoversikt';
import {
  BodyShort,
  Button,
  HStack,
  Loader,
  LocalAlert,
  VStack,
} from '@navikt/ds-react';
import { useMemo } from 'react';

type OppsummeringProps = StegBasisProps & {
  jobbsøkere: JobbsøkerDTO[];
  antallPåmeldte: number;
  onTilbake: () => void;
};

export default function Oppsummering({
  rekrutteringstreffId,
  treffgjennomføring,
  arbeidsgivere,
  jobbsøkere,
  antallPåmeldte,
  onTilbake,
}: OppsummeringProps) {
  const {
    data: formidlingerData,
    isLoading: henterFormidlinger,
    error: formidlingerFeil,
  } = useFormidlingerForTreffgjennomføring(rekrutteringstreffId);

  const oppsummering = useMemo(
    () =>
      lagOppsummering({
        registreringer: lagVurderingsoversikt({
          treffgjennomføring,
          arbeidsgivere,
          jobbsøkere,
          formidlinger: formidlingerData,
        }),
        antallMøtt: treffgjennomføring.oppmøte.length,
        antallPåmeldte,
        antallIntervjuer: treffgjennomføring.intervjufordelinger.reduce(
          (sum, fordeling) => sum + fordeling.inkludertePersonTreffIder.length,
          0,
        ),
      }),
    [
      treffgjennomføring,
      arbeidsgivere,
      jobbsøkere,
      formidlingerData,
      antallPåmeldte,
    ],
  );

  return (
    <VStack gap='space-32'>
      <Stegnavigasjon>
        <Button type='button' variant='secondary' onClick={onTilbake}>
          Tilbake
        </Button>
      </Stegnavigasjon>

      <section aria-labelledby='workop-oppsummering-heading'>
        <VStack gap='space-16'>
          <StegHeader
            id='workop-oppsummering-heading'
            tittel='Oppsummering'
            beskrivelse='Nøkkeltall for hele treffet. Hver kandidat telles én gang, med den mest positive vurderinga hen har fått.'
          />

          {formidlingerFeil && (
            <LocalAlert as='div' status='warning'>
              <LocalAlert.Content>
                Klarte ikke å hente formidlinger. Tallet for formidlede
                kandidater kan være for lavt.
              </LocalAlert.Content>
            </LocalAlert>
          )}

          {henterFormidlinger ? (
            <HStack gap='space-8' align='center'>
              <Loader size='small' aria-hidden />
              <BodyShort>Henter oppsummering …</BodyShort>
            </HStack>
          ) : (
            <VStack gap='space-24'>
              <OppsummeringNøkkeltall oppsummering={oppsummering} />
              <OppsummeringPerArbeidsgiver
                rader={oppsummering.perArbeidsgiver}
              />
            </VStack>
          )}
        </VStack>
      </section>
    </VStack>
  );
}
