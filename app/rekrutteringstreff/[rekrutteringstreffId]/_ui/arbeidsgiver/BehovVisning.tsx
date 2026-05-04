'use client';

import { ArbeidsgiverBehovDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { BodyShort, Heading, Tag } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

interface Props {
  behov: ArbeidsgiverBehovDTO;
}

interface TagSeksjonProps {
  tittel: string;
  tags: ReadonlyArray<{ key: string; label: ReactNode }>;
}

const TagSeksjon: FC<TagSeksjonProps> = ({ tittel, tags }) => {
  if (tags.length === 0) return null;
  return (
    <div>
      <Heading level='3' size='xsmall'>
        {tittel}
      </Heading>
      <div className='mt-1 flex flex-wrap gap-1'>
        {tags.map((t) => (
          <Tag key={t.key} size='small' variant='neutral-moderate'>
            {t.label}
          </Tag>
        ))}
      </div>
    </div>
  );
};

const BehovVisning: FC<Props> = ({ behov }) => (
  <div className='border-border-subtle mt-3 space-y-2 border-t pt-3'>
    <BodyShort size='small'>
      <strong>Antall stillinger:</strong> {behov.antall}
    </BodyShort>
    <TagSeksjon
      tittel='Hva arbeidsgiver leter etter'
      tags={behov.samledeKvalifikasjoner.map((tag) => ({
        key: `samlet-${tag.kategori}-${tag.konseptId}`,
        label: tag.label,
      }))}
    />
    <TagSeksjon
      tittel='Språk'
      tags={behov.arbeidssprak.map((sprak) => ({
        key: `sprak-${sprak}`,
        label: sprak,
      }))}
    />
    <TagSeksjon
      tittel='Ansettelsesform'
      tags={behov.ansettelsesformer.map((ans) => ({
        key: `ans-${ans}`,
        label: ans,
      }))}
    />
    <TagSeksjon
      tittel='Personlige egenskaper'
      tags={(behov.personligeEgenskaper ?? []).map((e) => ({
        key: `pe-${e.kategori}-${e.konseptId}`,
        label: e.label,
      }))}
    />
  </div>
);

export default BehovVisning;
