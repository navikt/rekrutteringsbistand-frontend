'use client';

import ErrorBoundary from '../../components/feilhåndtering/ErrorBoundary';
import { useApplikasjonContext } from '../../providers/ApplikasjonContext';
import Forespørsler from './Forespørsler';
import Utfallsstatistikk from './Utfallsstatistikk';
import { BodyShort, Heading, Select } from '@navikt/ds-react';
import { format, lastDayOfMonth, startOfMonth } from 'date-fns';
import { nb } from 'date-fns/locale';
import React, { ChangeEvent, useState } from 'react';

export interface IStatistikkValg {
  navKontor: string;
  fraOgMed: Date;
  tilOgMed: Date;
}
const Statistikk: React.FC = () => {
  const { valgtNavKontor } = useApplikasjonContext();
  const [startDatoPeriode, setStartDatoPeriode] = useState<Date>(
    startOfMonth(new Date()),
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

      const fraOgMed = startOfMonth(new Date(statistikkTidspunkt));
      return fraOgMed;
    });

  const fraOgMed = startDatoPeriode;
  const tilOgMed = lastDayOfMonth(new Date(startDatoPeriode));

  if (!valgtNavKontor?.navKontor) {
    return null;
  }
  return (
    <div className='w-full'>
      <div className={'mb-8 flex items-center gap-6'}>
        <div className='flex flex-col'>
          <Heading level='2' size='medium'>
            Ditt Nav-kontor
          </Heading>
          <BodyShort>
            {valgtNavKontor?.navKontorNavn ??
              `Enhet ${valgtNavKontor?.navKontor || '-'}`}
          </BodyShort>
        </div>
        <div className='"hidden bg-border-subtle skillelinje" h-px flex-grow' />
        <div />
        <Select
          className='flex items-center'
          label='Periode'
          onChange={onTidsperiodeChange}
        >
          {tidsperioder.map((tidsperiode) => (
            <option key={tidsperiode.getTime()} value={tidsperiode.getTime()}>
              {`${format(new Date(tidsperiode), 'd. MMMM yyyy', { locale: nb })}
              - ${format(
                lastDayOfMonth(new Date(tidsperiode)),
                'd. MMMM yyyy',
                {
                  locale: nb,
                },
              )}
              `}
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
