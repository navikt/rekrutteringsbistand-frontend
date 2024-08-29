import Link from 'next/link';
import { FunctionComponent, ReactNode } from 'react';
import { TilgangskontrollForInnhold } from '../../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Rolle } from '../../../types/Roller';
import FinnKandidaterIkon from '../icons/finn-kandidater.svg';
import FinnStillinger from '../icons/finn-stillinger.svg';
import OpprettNyStillingIkon from '../icons/opprett-ny-stilling.svg';
import SeMineStillingerIkon from '../icons/se-mine-stillinger.svg';

const Hurtiglenker: FunctionComponent = () => {
  return (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      ]}
    >
      <div className='justify-start items-start gap-4 inline-flex w-full'>
        <LenkepanelMedIkon
          href='/kandidatsok'
          tittel='Finn kandidater'
          ikon={<FinnKandidaterIkon />}
        />
        <LenkepanelMedIkon
          href='/stillingssok'
          tittel='Finn stillinger'
          ikon={<FinnStillinger />}
        />

        <LenkepanelMedIkon
          href={'/stillingssok?portefolje=visMine'}
          tittel='Se mine stillinger'
          ikon={<SeMineStillingerIkon />}
          // onClick={() => sendEvent('oversikt', 'vis_mine_stillinger_knapp')}
        />

        <LenkepanelMedIkon
          href='/stilling/ny-stilling'
          tittel='Opprett ny stilling'
          ikon={<OpprettNyStillingIkon />}
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
  <Link
    href={href}
    className={`h-28 bg-[#f2f3f5] rounded-xl shadow flex flex-grow`}
  >
    <div className='flex grow h-28 justify-start items-center'>
      <div className='pl-6 py-6 flex justify-center items-center gap-2'>
        <div className='w-16 h-16'>{ikon}</div>
      </div>
      <div className='flex grow h-28 p-6 justify-start items-center'>
        <div className='text-[#23262a] font-bold underline leading-loose'>
          {tittel}
        </div>
      </div>
    </div>
  </Link>
);

export default Hurtiglenker;
