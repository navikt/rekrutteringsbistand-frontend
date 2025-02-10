'use client';

import { FunctionComponent, ReactNode } from 'react';
import OpprettNyStillingIkon from '../../../public/ikoner/opprett-ny-stilling.svg';
import SeMineStillingerIkon from '../../../public/ikoner/se-mine-stillinger.svg';

import { Box, Link } from '@navikt/ds-react';
import SVGDarkmode from '../../components/SVGDarkmode';
import { TilgangskontrollForInnhold } from '../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../components/tilgangskontroll/roller';

const Hurtiglenker: FunctionComponent = () => {
  return (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      ]}
    >
      <div
        className='justify-start items-start gap-4 inline-flex w-full'
        data-testid='forside-hurtiglenker'
      >
        <LenkepanelMedIkon
          href={'/stillings-sok?portefolje=visMine'}
          ikon={
            <SVGDarkmode src={SeMineStillingerIkon} alt='Se mine stillinger' />
          }
          tittel='Se mine stillinger'
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
        />
      </div>
    </TilgangskontrollForInnhold>
  );
};

const LenkepanelMedIkon: FunctionComponent<{
  tittel: string;
  href: string;
  ikon: ReactNode;
  onClick?: () => void;
}> = ({ tittel, href, ikon, onClick }) => (
  <Box.New
    background='raised'
    borderColor='neutral-subtleA'
    borderRadius='xlarge'
    borderWidth='1'
    padding='0'
    className={`h-28  flex flex-grow`}
  >
    <Link href={href} className='w-full h-full'>
      <div className='flex grow h-28 justify-start items-center'>
        <Box padding='6' className='flex justify-center items-center gap-2'>
          <div className='w-16 h-16'>{ikon}</div>
        </Box>
        <Box padding='6' className='flex grow h-28 justify-start items-center'>
          <div className='font-bold underline leading-loose text-[var(--ax-text-default)]'>
            {tittel}
          </div>
        </Box>
      </div>
    </Link>
  </Box.New>
);

export default Hurtiglenker;
