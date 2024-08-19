import { BodyShort, Heading, Loader, Select } from '@navikt/ds-react';
import React, { ChangeEvent, useState } from 'react';
import { ApplikasjonContext } from '../../ApplikasjonContext';
import {
  førsteDagIMåned,
  sisteDagIMåned,
  visDatoMedMåned,
} from '../../util/dato';
import Utfallsstatistikk from './utfallsstatistikk/Utfallsstatistikk';

// import Forespørsler from './svar-statistikk/Forespørsler';
// import Utfallsstatistikk from './utfall-statistikk/Utfallsstatistikk';

const Statistikk: React.FC = () => {
  const { valgtNavKontor } = React.useContext(ApplikasjonContext);
  const [startDatoPeriode, setStartDatoPeriode] = useState<Date>(
    førsteDagIMåned(new Date())
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
    return <Loader />;
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
          label='Periode'
          onChange={onTidsperiodeChange}
          className='flex items-center'
        >
          {tidsperioder.map((tidsperiode) => (
            <option
              value={tidsperiode.getTime()}
              key={tidsperiode.getTime()}
              // className={css.periode}
            >
              {visDatoMedMåned(tidsperiode)} til{' '}
              {visDatoMedMåned(sisteDagIMåned(new Date(tidsperiode)))}
            </option>
          ))}
        </Select>
      </div>
      <Utfallsstatistikk
        navKontor={valgtNavKontor.navKontor}
        fraOgMed={fraOgMed}
        tilOgMed={tilOgMed}
      />
      {/* <Forespørsler navKontor={navKontor} fraOgMed={fraOgMed} tilOgMed={tilOgMed} /> */}
    </div>
  );
};

export default Statistikk;
