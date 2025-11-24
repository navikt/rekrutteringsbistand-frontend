'use client';

import { ArbeidsgiverHendelseLabel } from '../jobbsøker/HendelseLabel';
import LeggTilArbeidsgiverKnapp from './LeggTilArbeidsgiverKnapp';
import { ArbeidsgiverHendelserDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import { ArbeidsgiverHendelsestype } from '@/app/rekrutteringstreff/_types/constants';
import SVGDarkmode from '@/components/layout/SVGDarkmode';
import ArbeidsgiverDarkIkon from '@/public/ikoner/arbeidsgiver-dark.svg';
import ArbeidsgiverIkon from '@/public/ikoner/arbeidsgiver.svg';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Detail, Heading } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import { FC } from 'react';

interface Props {
  arbeidsgiverHendelserDTO: ArbeidsgiverHendelserDTO;
}

const ArbeidsgiverHendelserKort: FC<Props> = ({ arbeidsgiverHendelserDTO }) => {
  const antallLagtTil = arbeidsgiverHendelserDTO.filter(
    (h) => h.hendelsestype === ArbeidsgiverHendelsestype.OPPRETTET,
  ).length;

  const siste5 = arbeidsgiverHendelserDTO.slice(-5);

  return (
    <Box.New
      background='neutral-softA'
      className='mb-4 flex h-full flex-col px-4 py-3'
      borderRadius='xlarge'
    >
      <Heading level='2' size='small' className='mb-4'>
        Arbeidsgivere
      </Heading>
      <div className='min-h-[18rem]'>
        {arbeidsgiverHendelserDTO.length === 0 ? (
          <div className='flex flex-col items-center p-4'>
            <Box.New background='neutral-softA' className='mb-2 rounded-full'>
              <SVGDarkmode
                light={ArbeidsgiverIkon}
                dark={ArbeidsgiverDarkIkon}
                alt=''
              />
            </Box.New>
            <BodyShort className='text-center'>
              Finn og legg til en arbeidsgiver så dukker aktivitetene deres opp
              her.
            </BodyShort>
          </div>
        ) : (
          <div className='mb-12'>
            <div className='flex flex-wrap gap-2'>
              <ArbeidsgiverHendelseLabel
                icon={
                  <PlusCircleIcon className='text-[var(--ax-text-neutral)]' />
                }
                hendelseType={ArbeidsgiverHendelsestype.OPPRETTET}
                antall={antallLagtTil}
              />
            </div>

            <Heading size='xsmall' level='4' className='mt-8 mb-2'>
              Siste aktivitet
            </Heading>

            {siste5.map((h) => (
              <div key={h.id} className='mb-4 flex gap-2'>
                <div className='min-w-[10rem]'>
                  <ArbeidsgiverHendelseLabel
                    icon={
                      <PlusCircleIcon className='text-[var(--ax-text-neutral)]' />
                    }
                    hendelseType={h.hendelsestype}
                  />
                  <Detail className='ml-6'>
                    {format(new Date(h.tidspunkt), 'dd. MMMM yyyy', {
                      locale: nb,
                    })}
                  </Detail>
                </div>
                {h.orgnavn && (
                  <div>
                    <BodyShort>{h.orgnavn}</BodyShort>
                    <BodyShort>{h.orgnr}</BodyShort>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <LeggTilArbeidsgiverKnapp className='mt-auto w-full' />
    </Box.New>
  );
};

export default ArbeidsgiverHendelserKort;
