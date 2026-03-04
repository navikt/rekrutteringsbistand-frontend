import { ArbeidsgiverHendelseLabel } from '../jobbsøker/HendelseLabel';
import LeggTilArbeidsgiverKnapp from './LeggTilArbeidsgiverKnapp';
import { ArbeidsgiverHendelserDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import { getHendelseIcon } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/hendelser/HentHendelseIkon';
import { ArbeidsgiverHendelsestype } from '@/app/rekrutteringstreff/_types/constants';
import InfoBoks from '@/components/InfoBoks';
import SVGDarkmode from '@/components/layout/SVGDarkmode';
import ArbeidsgiverDarkIkon from '@/public/ikoner/arbeidsgiver-dark.svg';
import ArbeidsgiverIkon from '@/public/ikoner/arbeidsgiver.svg';
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
  const antallSlettet = arbeidsgiverHendelserDTO.filter(
    (h) => h.hendelsestype === ArbeidsgiverHendelsestype.SLETTET,
  ).length;

  const siste5 = arbeidsgiverHendelserDTO.slice(-5);

  return (
    <InfoBoks className='flex h-full flex-col'>
      <Heading level='2' size='small' className='mb-4'>
        Arbeidsgiver-hendelser
      </Heading>
      <div className='min-h-[18rem]'>
        {arbeidsgiverHendelserDTO.length === 0 ? (
          <div className='flex flex-col items-center p-4'>
            <Box background='neutral-softA' className='mb-2 rounded-full'>
              <SVGDarkmode
                light={ArbeidsgiverIkon}
                dark={ArbeidsgiverDarkIkon}
                alt=''
              />
            </Box>
            <BodyShort className='text-center'>
              Finn og legg til en arbeidsgiver så dukker aktivitetene deres opp
              her.
            </BodyShort>
          </div>
        ) : (
          <div className='mb-12'>
            <div className='flex flex-wrap gap-2'>
              <ArbeidsgiverHendelseLabel
                icon={getHendelseIcon(ArbeidsgiverHendelsestype.OPPRETTET)}
                hendelseType={ArbeidsgiverHendelsestype.OPPRETTET}
                antall={antallLagtTil}
              />
              <ArbeidsgiverHendelseLabel
                icon={getHendelseIcon(ArbeidsgiverHendelsestype.SLETTET)}
                hendelseType={ArbeidsgiverHendelsestype.SLETTET}
                antall={antallSlettet}
              />
            </div>

            <Heading size='xsmall' level='4' className='mt-8 mb-2'>
              Siste aktivitet
            </Heading>

            {siste5.map((h) => (
              <div key={h.id} className='mb-4 flex gap-2'>
                <div className='min-w-[10rem]'>
                  <ArbeidsgiverHendelseLabel
                    icon={getHendelseIcon(h.hendelsestype)}
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
    </InfoBoks>
  );
};

export default ArbeidsgiverHendelserKort;
