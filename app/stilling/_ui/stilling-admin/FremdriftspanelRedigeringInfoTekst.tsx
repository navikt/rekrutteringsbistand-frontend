import {
  BellDotIcon,
  BellIcon,
  EyeIcon,
  PersonCircleIcon,
  PersonGroupIcon,
  TasklistIcon,
} from '@navikt/aksel-icons';
import { BarChartIcon, ShieldLockIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Heading } from '@navikt/ds-react';
import { FC } from 'react';

export const FremdriftspanelRedigeringStillingInfoTekst: FC = () => {
  return (
    <Box.New background='neutral-soft' borderRadius={'large'} padding='3'>
      <Heading size='xsmall' level='3' className='mb-4'>
        Hva skjer etter publisering?
      </Heading>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-2'>
          <EyeIcon aria-hidden className='shrink-0' />
          <BodyShort size='small'>
            Oppdraget blir synlig for kollegaene dine.
          </BodyShort>
        </div>
        <div className='flex gap-2'>
          <PersonGroupIcon aria-hidden className='shrink-0' />
          <BodyShort size='small'>
            De kan finne og foreslå folk som kan egne seg til jobben. Du kan
            også finne folk på selv.
          </BodyShort>
        </div>
        <div className='flex gap-2'>
          <TasklistIcon aria-hidden className='shrink-0' />
          <BodyShort size='small'>
            Du velger hvem som kan deles med arbeidsgiveren og spør dem om
            samtykke til å dele CVen deres.
          </BodyShort>
        </div>
        <div className='flex gap-2'>
          <BellIcon aria-hidden className='shrink-0' />
          <BodyShort size='small'>
            Jobbsøkeren får beskjed, og muligheten til å svare i
            aktivtetsplanen.
          </BodyShort>
        </div>
      </div>
      <Heading size='xsmall' level='3' className='my-4'>
        For arbeidsgiver
      </Heading>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-2'>
          <BellDotIcon aria-hidden className='shrink-0' />
          <BodyShort size='small'>
            Arbeidsgiver får en ny sak på arbeidsgivers Min Side på Nav.no.
          </BodyShort>
        </div>
        <div className='flex gap-2'>
          <PersonCircleIcon aria-hidden className='shrink-0' />
          <BodyShort size='small'>
            I saken ser de stillingsbeskrivelsen, og jobbsøkere så snart de
            deles.
          </BodyShort>
        </div>
      </div>
    </Box.New>
  );
};

export const FremdriftspanelRedigeringEtterregistreringInfoTekst: FC = () => {
  return (
    <Box.New background='neutral-soft' borderRadius={'large'} padding='3'>
      <Heading size='xsmall' level='3' className='mb-4'>
        Hva skjer etter registrering?
      </Heading>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-2'>
          <BarChartIcon aria-hidden className='shrink-0' />
          <BodyShort size='small'>
            Registreringen sendes til statitstikk. Tellingene låses ved
            månedsskifte.
          </BodyShort>
        </div>
        <div className='flex gap-2'>
          <ShieldLockIcon aria-hidden className='shrink-0' />
          <BodyShort size='small'>
            Ved månedsskiftet låses registreringen. Det vil ikke lenger være
            mulig å rette feil.
          </BodyShort>
        </div>
      </div>
    </Box.New>
  );
};
