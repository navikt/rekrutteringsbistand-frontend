'use client';

import RomOgRotasjonUtskrift, {
  type Utskriftsvariant,
} from './RomOgRotasjonUtskrift';
import Rotasjonsmatrise from './Rotasjonsmatrise';
import { beregnRotasjonsplan } from './rotasjonsplan';
import { lagArbeidsgiverplaner, lagRomplaner } from './utskriftsplan';
import type { RomDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import { harArbeidsgiverTreffId } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/arbeidsgivere';
import type { StegBasisProps } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { PrinterSmallIcon } from '@navikt/aksel-icons';
import {
  Bleed,
  BodyShort,
  Box,
  Button,
  HStack,
  Heading,
  VStack,
} from '@navikt/ds-react';
import { useState, type FC } from 'react';

type Props = Pick<StegBasisProps, 'treffgjennomføring' | 'arbeidsgivere'> & {
  rom: RomDTO[];
  initialerPåJobbsøker: (personTreffId: string) => string;
  deaktivert: boolean;
};

const Arbeidsgiverrotasjon: FC<Props> = ({
  treffgjennomføring,
  arbeidsgivere,
  rom,
  initialerPåJobbsøker,
  deaktivert,
}) => {
  const [utskrift, setUtskrift] = useState<Utskriftsvariant>(null);
  const arbeidsgiverePerId = new Map(
    arbeidsgivere
      .filter(harArbeidsgiverTreffId)
      .map((arbeidsgiver) => [arbeidsgiver.arbeidsgiverTreffId, arbeidsgiver]),
  );
  const navnPåArbeidsgiver = (arbeidsgiverTreffId: string | null) =>
    arbeidsgiverTreffId
      ? (arbeidsgiverePerId.get(arbeidsgiverTreffId)?.navn ??
        'Ukjent arbeidsgiver')
      : 'Tomt';
  const rotasjonsplan = beregnRotasjonsplan(
    treffgjennomføring.arbeidsgiverRekkefølge,
    treffgjennomføring.antallRom,
    treffgjennomføring.starttidspunkt,
    treffgjennomføring.varighetPerMøteMinutter,
  );
  const sisteRunde = rotasjonsplan.at(-1);
  const harVenteplasser = rotasjonsplan.some(
    (runde) => runde.ventendeArbeidsgivere.length > 0,
  );
  const harTommeRom = rotasjonsplan.some((runde) =>
    runde.rom.some((romIRunde) => romIRunde.arbeidsgiverTreffId === null),
  );

  return (
    <>
      <section aria-labelledby='workop-rotasjon-heading'>
        <VStack gap='space-16'>
          <Heading id='workop-rotasjon-heading' level='3' size='small'>
            Arbeidsgiverrotasjon
          </Heading>
          <Box background='neutral-soft' borderRadius='8' padding='space-6'>
            <VStack gap='space-12' align='start'>
              <BodyShort>
                {rotasjonsplan.length} runder fra{' '}
                {rotasjonsplan[0]?.startKlokkeslett ??
                  treffgjennomføring.starttidspunkt}{' '}
                til{' '}
                {sisteRunde?.sluttKlokkeslett ??
                  treffgjennomføring.starttidspunkt}
                . Hver arbeidsgiver besøker alle rom.
              </BodyShort>
              {harVenteplasser && (
                <BodyShort size='small'>
                  Noen arbeidsgivere venter mellom rundene fordi det er færre
                  rom enn arbeidsgivere.
                </BodyShort>
              )}
              {harTommeRom && (
                <BodyShort size='small'>
                  Noen rom står tomme i enkelte runder fordi det er flere rom
                  enn arbeidsgivere.
                </BodyShort>
              )}
              <Bleed marginInline='space-6'>
                <HStack gap='space-8' wrap>
                  <Button
                    type='button'
                    variant='secondary'
                    icon={<PrinterSmallIcon aria-hidden />}
                    disabled={deaktivert}
                    onClick={() => setUtskrift('arbeidsgivere')}
                  >
                    Utskrift til arbeidsgivere
                  </Button>
                  <Button
                    type='button'
                    variant='secondary'
                    icon={<PrinterSmallIcon aria-hidden />}
                    disabled={deaktivert}
                    onClick={() => setUtskrift('jobbsøkere')}
                  >
                    Utskrift til jobbsøkere
                  </Button>
                </HStack>
              </Bleed>
            </VStack>
          </Box>
          <Rotasjonsmatrise
            rotasjonsplan={rotasjonsplan}
            harVenteplasser={harVenteplasser}
            navnForArbeidsgiver={navnPåArbeidsgiver}
          />
        </VStack>
      </section>
      <RomOgRotasjonUtskrift
        variant={utskrift}
        romplaner={lagRomplaner(rotasjonsplan)}
        arbeidsgiverplaner={lagArbeidsgiverplaner(
          rotasjonsplan,
          treffgjennomføring.arbeidsgiverRekkefølge.map(
            ({ arbeidsgiverTreffId }) => arbeidsgiverTreffId,
          ),
        )}
        rom={rom}
        initialerForJobbsøker={initialerPåJobbsøker}
        navnForArbeidsgiver={navnPåArbeidsgiver}
        onLukk={() => setUtskrift(null)}
      />
    </>
  );
};

export default Arbeidsgiverrotasjon;
