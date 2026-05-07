'use client';

import { ArbeidsgiverDTO as TreffArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { StillingAdminDTO } from '@/app/stilling/_ui/stilling-admin/page';
import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { FC } from 'react';

interface Props {
  arbeidsgiver: TreffArbeidsgiverDTO | undefined;
  jobbsøkere: JobbsøkerDTO[];
  formVerdier: Partial<StillingAdminDTO> | undefined;
}

const visEllerStrek = (verdi: string | null | undefined) =>
  verdi && verdi.trim().length > 0 ? verdi : '–';

const OpprettEtterregistreringOppsummering: FC<Props> = ({
  arbeidsgiver,
  jobbsøkere,
  formVerdier,
}) => {
  const stilling = formVerdier?.stilling;
  const properties = stilling?.properties;
  const yrkestittel = stilling?.categoryList?.[0]?.name ?? null;
  const lokasjoner = (stilling?.locationList ?? []).filter(Boolean);

  const formatLokasjon = (l: NonNullable<typeof lokasjoner>[number]) => {
    const deler = [
      l?.address,
      l?.postalCode,
      l?.city,
      l?.municipal,
      l?.county,
    ].filter((d): d is string => !!d && d.trim().length > 0);
    return deler.length > 0 ? deler.join(', ') : '–';
  };

  return (
    <VStack gap='space-24'>
      <BodyShort textColor='subtle'>
        Kontroller informasjonen før du oppretter etterregistreringen. Du kan gå
        tilbake for å endre.
      </BodyShort>

      <section>
        <Heading level='3' size='xsmall' spacing>
          Arbeidsgiver
        </Heading>
        <BodyShort weight='semibold'>{arbeidsgiver?.navn ?? '–'}</BodyShort>
        {arbeidsgiver?.organisasjonsnummer && (
          <BodyShort size='small' textColor='subtle'>
            Org.nr {arbeidsgiver.organisasjonsnummer}
          </BodyShort>
        )}
      </section>

      <section>
        <Heading level='3' size='xsmall' spacing>
          Jobbsøkere ({jobbsøkere.length})
        </Heading>
        <ul className='list-disc pl-5'>
          {jobbsøkere.map((j) => (
            <li key={j.personTreffId}>
              <BodyShort as='span' weight='semibold'>
                {j.etternavn ?? ''}
                {j.etternavn && j.fornavn ? ', ' : ''}
                {j.fornavn ?? ''}
              </BodyShort>{' '}
              <BodyShort as='span' size='small' textColor='subtle'>
                f.nr {j.fødselsnummer}
              </BodyShort>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <Heading level='3' size='xsmall' spacing>
          Formidlingsdetaljer
        </Heading>
        <dl className='grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1'>
          <dt className='text-text-subtle'>Yrkestittel</dt>
          <dd>{visEllerStrek(yrkestittel)}</dd>

          <dt className='text-text-subtle'>Sektor</dt>
          <dd>{visEllerStrek(properties?.sector)}</dd>

          <dt className='text-text-subtle'>Ansettelsesform</dt>
          <dd>{visEllerStrek(properties?.engagementtype)}</dd>

          <dt className='text-text-subtle'>Arbeidstidsordning</dt>
          <dd>{visEllerStrek(properties?.jobarrangement)}</dd>

          <dt className='text-text-subtle'>Omfang</dt>
          <dd>
            {properties?.extent
              ? `${properties.extent}${
                  properties?.jobpercentage
                    ? ` (${properties.jobpercentage}%)`
                    : ''
                }`
              : '–'}
          </dd>

          <dt className='text-text-subtle'>Sted</dt>
          <dd>
            {lokasjoner.length === 0 ? (
              '–'
            ) : (
              <ul className='m-0 list-none p-0'>
                {lokasjoner.map((l, i) => (
                  <li key={i}>{formatLokasjon(l)}</li>
                ))}
              </ul>
            )}
          </dd>

          <dt className='text-text-subtle'>Inkludering</dt>
          <dd>
            {properties?.tags && properties.tags.length > 0
              ? properties.tags
              : '–'}
          </dd>
        </dl>
      </section>
    </VStack>
  );
};

export default OpprettEtterregistreringOppsummering;
