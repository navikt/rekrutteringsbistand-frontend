'use client';
import type { VurderingDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import { alleInnsatsgrupper } from '@/app/kandidat/_ui/innsatsgrupper';
import { AndregangsintervjuDato } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/AndregangsintervjuDato';
import { VurderingsNotater } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/VurderingsNotater';
import type { RegistreringsRad } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/registreringAvStatusHjelpere';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import {
  BodyShort,
  Box,
  Checkbox,
  ErrorMessage,
  HStack,
  Link,
  Select,
  Tag,
  VStack,
} from '@navikt/ds-react';
import NextLink from 'next/link';
import { FC } from 'react';

const vurderingFraSkjemaverdi = (verdi: string): VurderingDTO['vurdering'] => {
  if (verdi === 'AKTUELL' || verdi === 'KANSKJE' || verdi === 'IKKE_AKTUELL') {
    return verdi;
  }
  return null;
};

const innsatsbehovEtikett = (innsatsgruppe: string | null): string | null => {
  if (!innsatsgruppe) return null;
  const oppslag =
    alleInnsatsgrupper[innsatsgruppe as keyof typeof alleInnsatsgrupper];
  return oppslag?.label ?? null;
};

interface Props {
  rad: RegistreringsRad;
  jobbsøkernavn: string;
  arbeidsgivernavn: string;
  formidlingerHref: string;
  lagringsfeil: string | null;
  onLagreVurdering: (vurdering: VurderingDTO) => void;
}

export const StatuskortRad: FC<Props> = ({
  rad,
  jobbsøkernavn,
  arbeidsgivernavn,
  formidlingerHref,
  lagringsfeil,
  onLagreVurdering,
}) => {
  const innsatsbehov = innsatsbehovEtikett(rad.jobbsøker.innsatsgruppe);
  const kontekst = `for ${jobbsøkernavn} hos ${arbeidsgivernavn}`;
  const skjermleserkontekst = (
    <span className='sr-only'>
      {' '}
      for {jobbsøkernavn} hos {arbeidsgivernavn}
    </span>
  );

  return (
    <Box
      as='li'
      background='neutral-soft'
      borderColor='neutral-subtle'
      borderWidth='1'
      borderRadius='8'
      padding={{ xs: 'space-12', md: 'space-16' }}
    >
      <VStack gap='space-12'>
        <HStack gap='space-8' justify='space-between' align='center' wrap>
          <BodyShort weight='semibold' className='min-w-0 flex-1 basis-64'>
            <AvkortetTekst>{jobbsøkernavn}</AvkortetTekst>
          </BodyShort>
          <HStack gap='space-8' wrap>
            {innsatsbehov && (
              <Tag size='small' variant='outline' data-color='neutral'>
                {innsatsbehov}
              </Tag>
            )}
            {rad.harInteresse && (
              <Tag size='small' variant='outline' data-color='info'>
                Interessert i å møte
              </Tag>
            )}
            {rad.sattOppTilIntervju && (
              <Tag size='small' variant='outline' data-color='meta-purple'>
                Satt opp til intervju
              </Tag>
            )}
            {rad.formidlet && (
              <Tag size='small' variant='moderate' data-color='success'>
                Formidlet
              </Tag>
            )}
          </HStack>
        </HStack>

        <HStack gap='space-16' align='end' wrap>
          <Box width='10rem' maxWidth='100%'>
            <Select
              label={<>Vurdering{skjermleserkontekst}</>}
              size='small'
              value={rad.vurdering.vurdering ?? ''}
              onChange={(event) =>
                onLagreVurdering({
                  ...rad.vurdering,
                  vurdering: vurderingFraSkjemaverdi(event.target.value),
                })
              }
            >
              <option value=''>Ingen vurdering</option>
              <option value='AKTUELL'>Aktuell</option>
              <option value='KANSKJE'>Kanskje</option>
              <option value='IKKE_AKTUELL'>Ikke aktuell</option>
            </Select>
          </Box>
          <HStack gap='space-16' align='center' wrap>
            <Checkbox
              size='small'
              checked={rad.vurdering.andregangsintervju}
              onChange={(event) => {
                const påSlått = event.currentTarget.checked;
                onLagreVurdering({
                  ...rad.vurdering,
                  andregangsintervju: påSlått,
                  andregangsintervjuDato: påSlått
                    ? rad.vurdering.andregangsintervjuDato
                    : null,
                });
              }}
            >
              2. intervju
              {skjermleserkontekst}
            </Checkbox>
            <Checkbox
              size='small'
              checked={rad.vurdering.jobbtilbud}
              onChange={(event) =>
                onLagreVurdering({
                  ...rad.vurdering,
                  jobbtilbud: event.currentTarget.checked,
                })
              }
            >
              Jobbtilbud
              {skjermleserkontekst}
            </Checkbox>
            {rad.formidlet && (
              <Link as={NextLink} href={formidlingerHref} inlineText>
                Vis formidling
              </Link>
            )}
          </HStack>
        </HStack>

        {rad.vurdering.andregangsintervju && (
          <AndregangsintervjuDato
            dato={rad.vurdering.andregangsintervjuDato}
            kontekst={kontekst}
            onEndre={(nyDato) =>
              onLagreVurdering({
                ...rad.vurdering,
                andregangsintervjuDato: nyDato,
              })
            }
          />
        )}

        <VurderingsNotater
          notater={rad.vurdering.notater}
          kontekst={kontekst}
          onEndre={(nyeNotater) =>
            onLagreVurdering({ ...rad.vurdering, notater: nyeNotater })
          }
        />
        {lagringsfeil && <ErrorMessage>{lagringsfeil}</ErrorMessage>}
      </VStack>
    </Box>
  );
};
