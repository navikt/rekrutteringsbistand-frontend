'use client';

import OpprettNyStillingIkon from '../../../public/ikoner/opprett-ny-stilling.svg';
import SeMineStillingerIkon from '../../../public/ikoner/se-mine-stillinger.svg';
import SVGDarkmode from '../../components/SVGDarkmode';
import { TilgangskontrollForInnhold } from '../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../components/tilgangskontroll/roller';
import { tilUmami, UmamiDomene, UmamiProps } from '../../umami';
import { Box } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { FunctionComponent, ReactNode } from 'react';

const Hurtiglenker: FunctionComponent = () => {
  return (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      ]}
    >
      <div
        className='inline-flex w-full items-start justify-start gap-4'
        data-testid='forside-hurtiglenker'
      >
        <LenkepanelMedIkon
          href={'/stilling?portefolje=visMine'}
          ikon={
            <SVGDarkmode src={SeMineStillingerIkon} alt='Se mine stillinger' />
          }
          tittel='Se mine stillinger'
          umamiProps={{
            domene: UmamiDomene.Forside,
            event: 'Se mine stillinger knapp',
          }}
        />

        <LenkepanelMedIkon
          href='/stilling/ny-stilling'
          ikon={
            <SVGDarkmode
              src={OpprettNyStillingIkon}
              alt='Opprett ny stilling'
            />
          }
          tittel='Opprett ny stilling'
          umamiProps={{
            domene: UmamiDomene.Generell,
            event: 'Opprett ny stilling knapp',
          }}
        />
      </div>
    </TilgangskontrollForInnhold>
  );
};

const LenkepanelMedIkon: FunctionComponent<{
  tittel: string;
  href: string;
  ikon: ReactNode;
  umamiProps?: UmamiProps;
}> = ({ tittel, href, ikon, umamiProps }) => {
  const router = useRouter();

  return (
    <Box.New
      onClick={() => {
        if (umamiProps) {
          tilUmami(umamiProps);
        }
        router.push(href);
      }}
      background='sunken'
      borderColor='neutral-subtleA'
      borderRadius='xlarge'
      padding='0'
      className={`flex h-20 flex-grow cursor-pointer`}
    >
      <Box.New className='flex h-20 grow items-center justify-start'>
        <Box padding='6' className='flex items-center justify-center gap-2'>
          <div className='h-16 w-16'>{ikon}</div>
        </Box>
        <Box padding='6' className='flex h-28 grow items-center justify-start'>
          <div className='leading-loose font-bold text-[var(--ax-text-default)] underline'>
            {tittel}
          </div>
        </Box>
      </Box.New>
    </Box.New>
  );
};

export default Hurtiglenker;
