'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent, ReactNode } from 'react';
import FinnKandidaterIkon from '../../../public/ikoner/finn-kandidater.svg';
import FinnStillinger from '../../../public/ikoner/finn-stillinger.svg';
import OpprettNyStillingIkon from '../../../public/ikoner/opprett-ny-stilling.svg';
import SeMineStillingerIkon from '../../../public/ikoner/se-mine-stillinger.svg';

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
      <div className='justify-start items-start gap-4 inline-flex w-full'>
        <LenkepanelMedIkon
          href='/kandidat-sok'
          ikon={<Image src={FinnKandidaterIkon} alt='Finn kandidater' />}
          tittel='Finn kandidater'
        />
        <LenkepanelMedIkon
          href='/stillings-sok'
          ikon={<Image src={FinnStillinger} alt='Finn stillinger' />}
          tittel='Finn stillinger'
        />

        <LenkepanelMedIkon
          href={'/stillings-sok?portefolje=visMine'}
          ikon={<Image src={SeMineStillingerIkon} alt='Se mine stillinger' />}
          tittel='Se mine stillinger'
        />

        <LenkepanelMedIkon
          href='/stilling/ny-stilling'
          ikon={<Image src={OpprettNyStillingIkon} alt='Opprett ny stilling' />}
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
  <Link
    className={`h-28 bg-[#f2f3f5] rounded-xl shadow flex flex-grow`}
    href={href}
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
