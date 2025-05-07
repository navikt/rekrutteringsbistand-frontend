import JobbsokerHeartUpDarkIkon from '../../../../../../public/ikoner/jobbsoker_heart-up-dark.svg';
import JobbsokerHeartUpIkon from '../../../../../../public/ikoner/jobbsoker_heart-up.svg';
import LeggTilJobbsøkerKnapp from '../../LeggTilJobbsøkerKnapp';
import HendelseLabel from './HendelseLabel';
import NavnLenke from './NavnLenke';
import { JobbsøkerHendelserDTO } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkerHendelser';
import SVGDarkmode from '@/app/components/SVGDarkmode';
import {
  CheckmarkCircleIcon,
  PlusCircleIcon,
  QuestionmarkDiamondIcon,
  XMarkOctagonIcon,
  EnvelopeClosedIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Box, Heading } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import * as React from 'react';

interface JobbsøkerHendelserKortProps {
  jobbsøkerHendelserDTO: JobbsøkerHendelserDTO;
}
const JobbsøkerHendelserKort: React.FC<JobbsøkerHendelserKortProps> = ({
  jobbsøkerHendelserDTO,
}) => {
  const antallHendelser = jobbsøkerHendelserDTO.length;
  const antallLagtTilHendelser = jobbsøkerHendelserDTO.filter(
    (h) => h.hendelsestype === 'OPPRETT',
  ).length;
  const siste5Hendelser = jobbsøkerHendelserDTO.slice(-5);

  return (
    <div>
      <Box.New
        background='neutral-softA'
        className='mb-4 max-w-[30rem] flex flex-col items-center justify-center'
        borderColor='neutral-subtleA'
        borderRadius='xlarge'
        borderWidth='1'
        padding='6'
      >
        <div>
          <Heading level='2' size='small' className='mb-4 text-left'>
            Jobbsøkere
          </Heading>
          <div className='min-h-[18rem] mb-12 '>
            {antallHendelser === 0 ? (
              <div className='p-4 mb-12 flex flex-col items-center'>
                <Box.New
                  background='raised'
                  className='rounded-full mb-2 flex items-center justify-center'
                >
                  <SVGDarkmode
                    light={JobbsokerHeartUpIkon}
                    dark={JobbsokerHeartUpDarkIkon}
                    alt='legg_til_jobbsøker'
                  />
                </Box.New>
                <BodyShort className='text-center'>
                  <span className='block'>
                    Finn og legg til en jobbsøker så dukker aktivitetene deres
                    opp her.
                  </span>
                </BodyShort>
              </div>
            ) : (
              <div>
                <div className='flex flex-wrap gap-2'>
                  <HendelseLabel
                    icon={<PlusCircleIcon className='text-white' />}
                    hendelseType='OPPRETT'
                    antall={antallLagtTilHendelser}
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

                <div className='mt-4'>
                  {siste5Hendelser.map((hendelse) => (
                    <div
                      key={hendelse.id}
                      className='flex flex-wrap gap-2 mb-4'
                    >
                      <div className='mb-2  min-w-[10rem]'>
                        <HendelseLabel
                          key={hendelse.id}
                          icon={<PlusCircleIcon className='text-white' />}
                          hendelseType={hendelse.hendelsestype}
                        />
                        <BodyShort className='ml-6'>
                          {format(
                            new Date(hendelse.tidspunkt),
                            'dd. MMMM yyyy',
                            { locale: nb },
                          )}
                        </BodyShort>
                      </div>
                      <div>
                        {hendelse.fornavn &&
                          hendelse.etternavn &&
                          hendelse.kandidatnummer && (
                            <NavnLenke
                              fornavn={hendelse.fornavn}
                              etternavn={hendelse.etternavn}
                              kandidatnummer={hendelse.kandidatnummer}
                            />
                          )}
                        {hendelse.fødselsnummer && (
                          <BodyShort>{hendelse.fødselsnummer}</BodyShort>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <LeggTilJobbsøkerKnapp className='w-full max-w-2xl' />
          </div>
        </div>
      </Box.New>
    </div>
  );
};

export default JobbsøkerHendelserKort;
