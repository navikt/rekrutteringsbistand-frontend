'use client';

import OpprettNyStillingIkon from '../../../public/ikoner/opprett-ny-stilling.svg';
import SeMineStillingerIkon from '../../../public/ikoner/se-mine-stillinger.svg';
import { UmamiEvent } from '../../../util/umamiEvents';
import SVGDarkmode from '../../components/SVGDarkmode';
import { TilgangskontrollForInnhold } from '../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../components/tilgangskontroll/roller';
import { useUmami } from '../../providers/UmamiContext';
import { Box, Link } from '@navikt/ds-react';
import { FunctionComponent, ReactNode } from 'react';

const Hurtiglenker: FunctionComponent = () => {
  const { trackAndNavigate } = useUmami();
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
        <Link
          className='flex-grow text-inherit'
          onClick={() =>
            trackAndNavigate(
              UmamiEvent.Forside.se_mine_stillinger_knapp,
              '/stilling?portefolje=visMine',
            )
          }
        >
          <LenkepanelMedIkon
            ikon={
              <SVGDarkmode
                src={SeMineStillingerIkon}
                alt='Se mine stillinger'
              />
            }
            tittel='Se mine stillinger'
          />
        </Link>
        <Link
          className='flex-grow text-inherit'
          onClick={() =>
            trackAndNavigate(
              UmamiEvent.Forside.opprett_ny_stilling_knapp,
              '/stilling/ny-stilling',
            )
          }
        >
          <LenkepanelMedIkon
            ikon={
              <SVGDarkmode
                src={OpprettNyStillingIkon}
                alt='Opprett ny stilling'
              />
            }
            tittel='Opprett ny stilling'
          />
        </Link>
      </div>
    </TilgangskontrollForInnhold>
  );
};

const LenkepanelMedIkon: FunctionComponent<{
  tittel: string;
  ikon: ReactNode;
}> = ({ tittel, ikon }) => {
  return (
    <Box.New
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
