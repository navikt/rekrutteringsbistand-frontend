'use client';

import { RekrutteringstreffHendelseLabel } from '../jobbsøker/HendelseLabel';
import { useAlleHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useAlleHendelser';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_contexts/RekrutteringstreffContext';
import { RekrutteringstreffHendelsestype } from '@/app/rekrutteringstreff/_domain/constants';
import { PencilIcon, PlusCircleIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import { format } from 'date-fns';
import { FC } from 'react';

const GRID = 'grid grid-cols-[14rem_16rem_12rem_9rem] gap-x-4 items-center';

const Hendelser: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: hendelser } = useAlleHendelser(rekrutteringstreffId);

  if (!hendelser) return null;

  const lowercaseStorBokstavFørst = (txt: string) =>
    txt.length === 0 ? '' : txt[0].toUpperCase() + txt.slice(1).toLowerCase();

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
          <RekrutteringstreffHendelseLabel
            hendelseType={h.hendelsestype as RekrutteringstreffHendelsestype}
            icon={
              h.hendelsestype === RekrutteringstreffHendelsestype.OPPRETT ? (
                <PlusCircleIcon className='text-white' />
              ) : (
                <PencilIcon className='text-white' />
              )
            }
          />

          <BodyShort className='whitespace-nowrap'>
            {lowercaseStorBokstavFørst(h.ressurs)}
          </BodyShort>

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

export default Hendelser;
