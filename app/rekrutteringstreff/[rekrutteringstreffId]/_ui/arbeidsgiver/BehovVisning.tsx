'use client';

import { ArbeidsgiverBehovDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { BodyShort, Heading, Tag } from '@navikt/ds-react';
import { FC } from 'react';

interface Props {
  behov: ArbeidsgiverBehovDTO;
}

const BehovVisning: FC<Props> = ({ behov }) => {
  return (
    <div className='border-border-subtle mt-3 space-y-2 border-t pt-3'>
      <BodyShort size='small'>
        <strong>Antall stillinger:</strong> {behov.antall}
      </BodyShort>
      <div>
        <Heading level='3' size='xsmall'>
          Hva arbeidsgiver leter etter
        </Heading>
        <div className='mt-1 flex flex-wrap gap-1'>
          {behov.samledeKvalifikasjoner.map((tag) => (
            <Tag
              key={`samlet-${tag.kategori}-${tag.konseptId}`}
              size='small'
              variant='neutral-moderate'
            >
              {tag.label}
            </Tag>
          ))}
        </div>
      </div>
      <div>
        <Heading level='3' size='xsmall'>
          Språk
        </Heading>
        <div className='mt-1 flex flex-wrap gap-1'>
          {behov.arbeidssprak.map((sprak) => (
            <Tag key={`sprak-${sprak}`} size='small' variant='neutral-moderate'>
              {sprak}
            </Tag>
          ))}
        </div>
      </div>
      <div>
        <Heading level='3' size='xsmall'>
          Ansettelsesform
        </Heading>
        <div className='mt-1 flex flex-wrap gap-1'>
          {behov.ansettelsesformer.map((ansettelsesform) => (
            <Tag
              key={`ans-${ansettelsesform}`}
              size='small'
              variant='neutral-moderate'
            >
              {ansettelsesform}
            </Tag>
          ))}
        </div>
      </div>
      {behov.personligeEgenskaper && behov.personligeEgenskaper.length > 0 && (
        <div>
          <Heading level='3' size='xsmall'>
            Personlige egenskaper
          </Heading>
          <div className='mt-1 flex flex-wrap gap-1'>
            {behov.personligeEgenskaper.map((egenskap) => (
              <Tag
                key={`pe-${egenskap.kategori}-${egenskap.konseptId}`}
                size='small'
                variant='neutral-moderate'
              >
                {egenskap.label}
              </Tag>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BehovVisning;
