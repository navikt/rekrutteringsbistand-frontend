'use client';
import { BodyShort, Heading, Select } from '@navikt/ds-react';
import React, { ChangeEvent, useState } from 'react';
import {
  førsteDagIMåned,
  sisteDagIMåned,
  visDatoMedMåned,
} from '../../../util/dato';
import { useApplikasjonContext } from '../../ApplikasjonContext';
import ErrorBoundary from '../../components/feilhåndtering/ErrorBoundary';
import Sidelaster from '../../components/Sidelaster';
import Forespørsler from './Forespørsler';
import Utfallsstatistikk from './Utfallsstatistikk';

export interface IStatistikkValg {
  navKontor: string;
  fraOgMed: Date;
  tilOgMed: Date;
}
const Statistikk: React.FC = () => {
  const { valgtNavKontor } = useApplikasjonContext();
  const [startDatoPeriode, setStartDatoPeriode] = useState<Date>(
    førsteDagIMåned(new Date()),
  );

  const onTidsperiodeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const startDatoPeriode = new Date(+event.target.value);
    setStartDatoPeriode(startDatoPeriode);
  };

  const antallMånederForHistorikk = 12;
  const tidsperioder = Array<number>(antallMånederForHistorikk)
    .fill(0, 0, antallMånederForHistorikk)
    .map((_, i) => {
      const statistikkTidspunkt = new Date();
      statistikkTidspunkt.setDate(1);
      statistikkTidspunkt.setMonth(statistikkTidspunkt.getMonth() - i);

      const fraOgMed = førsteDagIMåned(new Date(statistikkTidspunkt));
      return fraOgMed;
    });

  const fraOgMed = startDatoPeriode;
  const tilOgMed = sisteDagIMåned(new Date(startDatoPeriode));

  if (!valgtNavKontor?.navKontor) {
    return <Sidelaster />;
  }
  return (
    <div className='w-full'>
      <div className={'flex  mb-8 gap-6 items-center'}>
        <div className='flex flex-col'>
          <Heading level='2' size='medium'>
            Ditt NAV-kontor
          </Heading>
          <BodyShort>
            {valgtNavKontor?.navKontorNavn ??
              `Enhet ${valgtNavKontor?.navKontor || '-'}`}
          </BodyShort>
        </div>
        <div className='"hidden h-px bg-border-subtle flex-grow skillelinje"' />
        <div />
        <Select
          className='flex items-center'
          label='Periode'
          onChange={onTidsperiodeChange}
        >
          {tidsperioder.map((tidsperiode) => (
            <option
              key={tidsperiode.getTime()}
              value={tidsperiode.getTime()}

              // className={css.periode}
            >
              {visDatoMedMåned(tidsperiode)} til{' '}
              {visDatoMedMåned(sisteDagIMåned(new Date(tidsperiode)))}
            </option>
          ))}
        </Select>
      </div>
      <ErrorBoundary>
        <Utfallsstatistikk
          fraOgMed={fraOgMed}
          navKontor={valgtNavKontor.navKontor}
          tilOgMed={tilOgMed}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <Forespørsler
          fraOgMed={fraOgMed}
          navKontor={valgtNavKontor.navKontor}
          tilOgMed={tilOgMed}
        />
      </ErrorBoundary>
    </div>
  );
};

export default Statistikk;
