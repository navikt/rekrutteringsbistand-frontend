'use client';

import { ArbeidsgiverDTO as TreffArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { GeografiDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { StillingAdminDTO } from '@/app/stilling/_ui/stilling-admin/page';
import { getWorkLocationsAsString } from '@/util/locationUtil';
import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Heading, VStack } from '@navikt/ds-react';
import { FC } from 'react';

export interface OppsummeringJobbsøker {
  personTreffId: string;
  fødselsnummer: string;
  fornavn: string | null;
  etternavn: string | null;
}

interface Props {
  arbeidsgiver: TreffArbeidsgiverDTO | undefined;
  jobbsøkere: OppsummeringJobbsøker[];
  formVerdier: Partial<StillingAdminDTO> | undefined;
  onFjernJobbsøker: (fødselsnummer: string) => void;
}

const visEllerStrek = (verdi: string | null | undefined) =>
  verdi && verdi.trim().length > 0 ? verdi : '–';

const OpprettFormidlingOppsummering: FC<Props> = ({
  arbeidsgiver,
  jobbsøkere,
  formVerdier,
  onFjernJobbsøker,
}) => {
  const stilling = formVerdier?.stilling;
  const properties = stilling?.properties;
  const yrkestittel = stilling?.categoryList?.[0]?.name ?? null;
  const lokasjoner = (stilling?.locationList ?? []).filter(Boolean);

  const lokasjonString = getWorkLocationsAsString(lokasjoner as GeografiDTO[]);

  return (
    <VStack gap='space-24'>
      <BodyShort textColor='subtle'>
        Kontroller informasjonen før du oppretter formidlingen. Du kan gå
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
        <ul className='m-0 list-none p-0'>
          {jobbsøkere.map((j) => (
            <li
              key={j.personTreffId}
              className='border-border-subtle flex items-center justify-between gap-2 border-b py-2 last:border-b-0'
            >
              <div>
                <BodyShort as='span' weight='semibold'>
                  {j.etternavn ?? ''}
                  {j.etternavn && j.fornavn ? ', ' : ''}
                  {j.fornavn ?? ''}
                </BodyShort>{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  f.nr {j.fødselsnummer}
                </BodyShort>
              </div>
              <Button
                size='small'
                variant='tertiary'
                icon={<TrashIcon aria-hidden />}
                onClick={() => onFjernJobbsøker(j.fødselsnummer)}
              >
                Fjern
              </Button>
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
          <dd>{lokasjoner.length === 0 ? '–' : lokasjonString}</dd>

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

export default OpprettFormidlingOppsummering;
