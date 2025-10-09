'use client';

import { ArbeidsgiverHendelseLabel } from '../jobbsøker/HendelseLabel';
import LeggTilArbeidsgiverKnapp from './LeggTilArbeidsgiverKnapp';
import { ArbeidsgiverHendelserDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import { ArbeidsgiverHendelsestype } from '@/app/rekrutteringstreff/_types/constants';
import SVGDarkmode from '@/components/layout/SVGDarkmode';
import ArbeidsgiverDarkIkon from '@/public/ikoner/arbeidsgiver-dark.svg';
import ArbeidsgiverIkon from '@/public/ikoner/arbeidsgiver.svg';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Heading } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import { FC } from 'react';

interface Props {
  arbeidsgiverHendelserDTO: ArbeidsgiverHendelserDTO;
}

const ArbeidsgiverHendelserKort: FC<Props> = ({ arbeidsgiverHendelserDTO }) => {
  const antallLagtTil = arbeidsgiverHendelserDTO.filter(
    (h) => h.hendelsestype === ArbeidsgiverHendelsestype.OPPRETT,
  ).length;

  const siste5 = arbeidsgiverHendelserDTO.slice(-5);

  return (
    <Box.New
      background='neutral-softA'
      className='mb-4 flex flex-col h-full'
      borderColor='neutral-subtleA'
      borderRadius='xlarge'
      borderWidth='1'
      padding='6'
    >
      <Heading level='2' size='small' className='mb-4'>
        Arbeidsgivere
      </Heading>
      <div className='min-h-[18rem]'>
        {arbeidsgiverHendelserDTO.length === 0 ? (
          <div className='p-4 flex flex-col items-center'>
            <Box.New background='neutral-softA' className='rounded-full mb-2'>
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
                icon={<PlusCircleIcon className='text-white' />}
                hendelseType={ArbeidsgiverHendelsestype.OPPRETT}
                antall={antallLagtTil}
              />
            </div>

            <Heading size='xsmall' level='4' className='mt-8 mb-2'>
              Siste hendelser
            </Heading>

            {siste5.map((h) => (
              <div key={h.id} className='flex gap-2 mb-4'>
                <div className='min-w-[10rem]'>
                  <ArbeidsgiverHendelseLabel
                    icon={<PlusCircleIcon className='text-white' />}
                    hendelseType={h.hendelsestype}
                  />
                  <BodyShort className='ml-6'>
                    {format(new Date(h.tidspunkt), 'dd. MMMM yyyy', {
                      locale: nb,
                    })}
                  </BodyShort>
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
      <LeggTilArbeidsgiverKnapp className='w-full mt-auto' />
    </Box.New>
  );
};

export default ArbeidsgiverHendelserKort;
