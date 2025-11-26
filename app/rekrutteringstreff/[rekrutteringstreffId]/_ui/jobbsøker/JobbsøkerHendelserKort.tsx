import { JobbsøkerHendelseLabel } from './HendelseLabel';
import LeggTilJobbsøkerKnapp from './LeggTilJobbsøkerKnapp';
import NavnLenke from './NavnLenke';
import { JobbsøkerHendelserDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerHendelser';
import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import { JobbsøkerHendelsestype } from '@/app/rekrutteringstreff/_types/constants';
import SVGDarkmode from '@/components/layout/SVGDarkmode';
import JobbsokerHeartUpDarkIkon from '@/public/ikoner/jobbsoker_heart-up-dark.svg';
import JobbsokerHeartUpIkon from '@/public/ikoner/jobbsoker_heart-up.svg';
import {
  CheckmarkCircleIcon,
  EnvelopeClosedIcon,
  PlusCircleIcon,
  QuestionmarkDiamondIcon,
  XMarkOctagonIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Box, Detail, Heading } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import { FC } from 'react';

interface JobbsøkerHendelserKortProps {
  jobbsøkerHendelserDTO: JobbsøkerHendelserDTO;
  rekrutteringstreffStatus: RekrutteringstreffStatusType;
  rekrutteringstreffId: string;
}
const JobbsøkerHendelserKort: FC<JobbsøkerHendelserKortProps> = ({
  jobbsøkerHendelserDTO, rekrutteringstreffId, rekrutteringstreffStatus
}) => {
  const antallHendelser = jobbsøkerHendelserDTO.length;
  const antallLagtTilHendelser = jobbsøkerHendelserDTO.filter(
    (h) => h.hendelsestype === JobbsøkerHendelsestype.OPPRETTET,
  ).length;
  const antallInviterte = jobbsøkerHendelserDTO.filter(
    (h) => h.hendelsestype === JobbsøkerHendelsestype.INVITERT,
  ).length;
  const antallSvarJa = jobbsøkerHendelserDTO.filter(
    (h) => h.hendelsestype === JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON,
  ).length;
  const antallSvarNei = jobbsøkerHendelserDTO.filter(
    (h) => h.hendelsestype === JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON,
  ).length;
  const antallTreffAvlystJa = jobbsøkerHendelserDTO.filter(
    (h) => h.hendelsestype === JobbsøkerHendelsestype.SVART_JA_TREFF_AVLYST,
  ).length;
  const antallTreffFullførtJa = jobbsøkerHendelserDTO.filter(
    (h) => h.hendelsestype === JobbsøkerHendelsestype.SVART_JA_TREFF_FULLFØRT,
  ).length;

  const antallUbesvart = Math.max(
    0,
    antallInviterte - antallSvarJa - antallSvarNei,
  );
  const siste5Hendelser = jobbsøkerHendelserDTO.slice(-5);

  const visKunTreffResultat = antallTreffAvlystJa + antallTreffFullførtJa > 0;

  return (
    <Box.New
      background='neutral-softA'
      className='mb-4 flex h-full flex-col px-4 py-3'
      borderRadius='xlarge'
    >
      <Heading level='2' size='small' className='mb-4 text-left'>
        Jobbsøkere
      </Heading>
      <div className='min-h-[18rem] flex-1'>
        {antallHendelser === 0 ? (
          <div className='flex flex-col items-center p-4'>
            <Box.New background='neutral-softA' className='mb-2 rounded-full'>
              <SVGDarkmode
                light={JobbsokerHeartUpIkon}
                dark={JobbsokerHeartUpDarkIkon}
                alt='legg_til_jobbsøker'
              />
            </Box.New>
            <BodyShort className='text-center'>
              <span className='block'>
                Finn og legg til en jobbsøker så dukker aktivitetene deres opp
                her.
              </span>
            </BodyShort>
          </div>
        ) : (
          <div className='mb-12'>
            <div className='flex flex-wrap gap-2'>
              {visKunTreffResultat ? (
                <>
                  {antallTreffFullførtJa > 0 && (
                    <JobbsøkerHendelseLabel
                      icon={<CheckmarkCircleIcon className='text-green-500' />}
                      hendelseType={
                        JobbsøkerHendelsestype.SVART_JA_TREFF_FULLFØRT
                      }
                      antall={antallTreffFullførtJa}
                    />
                  )}
                  {antallTreffAvlystJa > 0 && (
                    <JobbsøkerHendelseLabel
                      icon={
                        <XMarkOctagonIcon className='text-[var(--ax-text-meta-purple-decoration)]' />
                      }
                      hendelseType={
                        JobbsøkerHendelsestype.SVART_JA_TREFF_AVLYST
                      }
                      antall={antallTreffAvlystJa}
                    />
                  )}
                </>
              ) : (
                <>
                  <JobbsøkerHendelseLabel
                    icon={
                      <PlusCircleIcon className='text-[var(--ax-text-neutral)]' />
                    }
                    hendelseType={JobbsøkerHendelsestype.OPPRETTET}
                    antall={antallLagtTilHendelser}
                  />
                  <JobbsøkerHendelseLabel
                    icon={
                      <EnvelopeClosedIcon className='text-[var(--ax-text-accent-subtle)]' />
                    }
                    hendelseType={JobbsøkerHendelsestype.INVITERT}
                    antall={antallInviterte}
                  />
                  <JobbsøkerHendelseLabel
                    icon={
                      <CheckmarkCircleIcon className='text-[var(--ax-text-success-decoration)]' />
                    }
                    hendelseType={
                      JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON
                    }
                    antall={antallSvarJa}
                  />
                  <JobbsøkerHendelseLabel
                    icon={
                      <XMarkOctagonIcon className='text-[var(--ax-text-meta-purple-decoration)]' />
                    }
                    hendelseType={
                      JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON
                    }
                    antall={antallSvarNei}
                  />
                  <JobbsøkerHendelseLabel
                    icon={
                      <QuestionmarkDiamondIcon className='text-[var(--ax-text-accent-subtle)]' />
                    }
                    hendelseType={'ubesvart'}
                    antall={antallUbesvart}
                  />
                </>
              )}
            </div>

            <Heading size='xsmall' level='4' className='mt-8 mb-2'>
              Siste aktivitet
            </Heading>

            <div className='mt-4'>
              {siste5Hendelser.map((hendelse) => (
                <div key={hendelse.id} className='mb-4 flex flex-wrap gap-3'>
                  <div className='mb-2 min-w-[10rem]'>
                    <JobbsøkerHendelseLabel
                      key={hendelse.id}
                      icon={
                        <PlusCircleIcon className='text-[var(--ax-text-neutral)]' />
                      }
                      hendelseType={hendelse.hendelsestype}
                    />
                    <Detail className='ml-6'>
                      {format(new Date(hendelse.tidspunkt), 'dd. MMMM yyyy', {
                        locale: nb,
                      })}
                    </Detail>
                  </div>
                  <div>
                    {hendelse.fornavn &&
                      hendelse.etternavn &&
                      hendelse.kandidatnummer && (
                        <NavnLenke
                          fornavn={hendelse.fornavn}
                          etternavn={hendelse.etternavn}
                          personTreffId={hendelse.personTreffId}
                          rekrutteringstreffId={rekrutteringstreffId}
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
      <LeggTilJobbsøkerKnapp
        rekrutteringstreffStatus={rekrutteringstreffStatus}
        className='mt-auto w-full'
      />
    </Box.New>
  );
};

export default JobbsøkerHendelserKort;
