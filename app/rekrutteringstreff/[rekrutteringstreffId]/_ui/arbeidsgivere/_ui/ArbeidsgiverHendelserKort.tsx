'use client';

import { ArbeidsgiverHendelserDTO } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgiverHendelser';
import LeggTilArbeidsgiverModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/LeggTilArbeidsgiverModal';
import HendelseLabel from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøkere/_ui/HendelseLabel';
import SVGDarkmode from '@/components/layout/SVGDarkmode';
import ArbeidsgiverDarkIkon from '@/public/ikoner/arbeidsgiver-dark.svg';
import ArbeidsgiverIkon from '@/public/ikoner/arbeidsgiver.svg';
import {
  CheckmarkCircleIcon,
  EnvelopeClosedIcon,
  PlusCircleIcon,
  QuestionmarkDiamondIcon,
  XMarkOctagonIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Heading } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import { PlusIcon } from 'lucide-react';
import { FC, useRef } from 'react';

interface Props {
  arbeidsgiverHendelserDTO: ArbeidsgiverHendelserDTO;
}

const ArbeidsgiverHendelserKort: FC<Props> = ({ arbeidsgiverHendelserDTO }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const antallLagtTil = arbeidsgiverHendelserDTO.filter(
    (h) => h.hendelsestype === 'OPPRETT',
  ).length;

  const siste5 = arbeidsgiverHendelserDTO.slice(-5);

  return (
    <Box.New
      background='neutral-softA'
      className='mb-4'
      borderColor='neutral-subtleA'
      borderRadius='xlarge'
      borderWidth='1'
      padding='6'
    >
      <Heading level='2' size='small' className='mb-4'>
        Arbeidsgivere
      </Heading>
      <div className='min-h-[18rem] mb-12'>
        {arbeidsgiverHendelserDTO.length === 0 ? (
          <div className='p-4 mb-12 flex flex-col items-center'>
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
              <HendelseLabel
                icon={<PlusCircleIcon className='text-white' />}
                hendelseType='OPPRETT'
                antall={antallLagtTil}
              />
              <HendelseLabel
                icon={<CheckmarkCircleIcon className='text-green-500' />}
                hendelseType='DELTA'
                antall={0}
              />
              <HendelseLabel
                icon={<QuestionmarkDiamondIcon className='text-sky-300' />}
                hendelseType='UBESVART'
                antall={0}
              />
              <HendelseLabel
                icon={<XMarkOctagonIcon className='text-violet-300' />}
                hendelseType='IKKE_INTERESSERT'
                antall={0}
              />
              <HendelseLabel
                icon={<EnvelopeClosedIcon className='text-blue-400' />}
                hendelseType='INVITER'
                antall={0}
              />
            </div>

            <Heading size='xsmall' level='4' className='mt-8 mb-2'>
              Siste aktivitet
            </Heading>

            {siste5.map((h) => (
              <div key={h.id} className='flex gap-2 mb-4'>
                <div className='min-w-[10rem]'>
                  <HendelseLabel
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
      <Button
        onClick={() => modalRef.current?.showModal()}
        variant='secondary'
        icon={<PlusIcon />}
        className='w-full'
      >
        Legg til arbeidsgiver
      </Button>
      <LeggTilArbeidsgiverModal modalRef={modalRef} />
    </Box.New>
  );
};

export default ArbeidsgiverHendelserKort;
