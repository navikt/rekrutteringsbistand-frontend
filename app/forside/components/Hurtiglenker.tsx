import { BodyShort } from '@navikt/ds-react';
import { FunctionComponent, ReactNode } from 'react';
import FinnKandidaterIkon from '../icons/finn-kandidater.svg';
import FinnStillinger from '../icons/finn-stillinger.svg';
import OpprettNyStillingIkon from '../icons/opprett-ny-stilling.svg';
import SeMineStillingerIkon from '../icons/se-mine-stillinger.svg';
// import { sendEvent } from '../../felles/amplitude';
// import { Rolle } from '../../felles/tilgangskontroll/Roller';
// import { TilgangskontrollForInnhold } from '../../felles/tilgangskontroll/TilgangskontrollForInnhold';
import Link from 'next/link';
import { Rolle } from '../../tilgangskontroll/Roller';
import { TilgangskontrollForInnhold } from '../../tilgangskontroll/TilgangskontrollForInnhold';

const Hurtiglenker: FunctionComponent = () => {
  return (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      ]}
    >
      <nav className='grid grid-cols-4 gap-4 w-full mb-4'>
        <LenkepanelMedIkon
          href='/kandidatsok'
          tittel='Finn kandidater'
          ikon={<FinnKandidaterIkon />}
        />
        <LenkepanelMedIkon
          href='/stillinger/stillingssok?brukStandardsok=true'
          tittel='Finn stillinger'
          ikon={<FinnStillinger />}
        />

        <LenkepanelMedIkon
          href={'/stillinger/stillingssok?portefolje=visMine'}
          tittel='Se mine stillinger'
          ikon={<SeMineStillingerIkon />}
          // onClick={() => sendEvent('oversikt', 'vis_mine_stillinger_knapp')}
        />

        <LenkepanelMedIkon
          href='/stillinger/stillingssok?modal=opprettStillingModal'
          tittel='Opprett ny stilling'
          ikon={<OpprettNyStillingIkon />}
        />
      </nav>{' '}
    </TilgangskontrollForInnhold>
  );
};

const LenkepanelMedIkon: FunctionComponent<{
  tittel: string;
  href: string;
  ikon: ReactNode;
  onClick?: () => void;
}> = ({ tittel, href, ikon, onClick }) => (
  <Link
    href={href}
    className={'navds-link-panel rounded-lg bg-gray-50 shadow-sm'}
    onClick={onClick}
  >
    <div className='flex items-center text-2xl gap-6 p-6'>
      {ikon}
      <BodyShort
        className={
          'underline decoration-[0.05rem] underline-offset-[0.1rem] font-semibold'
        }
      >
        {tittel}
      </BodyShort>
    </div>
  </Link>
);

export default Hurtiglenker;
