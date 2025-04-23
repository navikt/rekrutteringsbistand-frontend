'use client';

import { useRekrutteringstreffContext } from '../../../RekrutteringstreffContext';
import HendelseLabel from '../../jobbsøkere/components/HendelseLabel';
import { useAlleHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useAlleHendelser';
import { PlusCircleIcon, PencilIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import { format } from 'date-fns';
import * as React from 'react';

const GRID = 'grid grid-cols-[14rem_16rem_12rem_9rem] gap-x-4 items-center';

const Aktiviteter: React.FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: hendelser } = useAlleHendelser(rekrutteringstreffId);

  if (!hendelser) return null;

  return (
    <section className='flex flex-col gap-4 mt-4'>
      <div className={`${GRID} font-semibold text-lg`}>
        <span>Hendelse</span>
        <span>Ressurs</span>
        <span>Tidspunkt</span>
        <span>Utført av</span>
      </div>

      {hendelser.map((h) => (
        <div key={h.id} className={GRID}>
          <HendelseLabel
            hendelseType={h.hendelsestype}
            icon={
              h.hendelsestype === 'OPPRETT' ? (
                <PlusCircleIcon className='text-white' />
              ) : (
                <PencilIcon className='text-white' />
              )
            }
          />

          <BodyShort className='whitespace-nowrap'>{h.ressurs}</BodyShort>

          <BodyShort className='whitespace-nowrap'>
            {format(new Date(h.tidspunkt), 'dd.MM.yyyy HH:mm')}
          </BodyShort>

          <BodyShort className='whitespace-nowrap'>
            {h.aktørIdentifikasjon ?? '–'}
          </BodyShort>
        </div>
      ))}
    </section>
  );
};

export default Aktiviteter;
