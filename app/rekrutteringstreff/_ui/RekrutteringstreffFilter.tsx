'use client';

import {
  SuggestType,
  useUseSugestions,
} from '@/app/api/kandidat-sok/useSugestions';
import AlleFilterKomponent from '@/components/filter/AlleFilterKomponent';
import { Search, UNSAFE_Combobox } from '@navikt/ds-react';
import { FC, useState } from 'react';

export const RekrutteringstreffFilter: FC = () => {
  const [fritekstSøkTekst, setFritekstSøkTekst] = useState('');

  const [kompetanse, setKompetanse] = useState<string[]>([]);
  const [kompetanseSøkeTekst, setKompetanseSøkeTekst] = useState<string>('');

  const [yrke, setYrke] = useState<string[]>([]);
  const [yrkeSøkeTekst, setYrkeSøkeTekst] = useState<string>('');

  const onKompetanseSelected = (option: string, isSelected: boolean) => {
    if (isSelected) {
      setKompetanse([...(Array.isArray(kompetanse) ? kompetanse : []), option]);
    } else {
      setKompetanse(
        Array.isArray(kompetanse) ? kompetanse.filter((o) => o !== option) : [],
      );
    }
  };

  const onYrkeSelected = (option: string, isSelected: boolean) => {
    if (isSelected) {
      setYrke([...(Array.isArray(yrke) ? yrke : []), option]);
    } else {
      setYrke(Array.isArray(yrke) ? yrke.filter((o) => o !== option) : []);
    }
  };

  const kompetanseHook = useUseSugestions(
    kompetanseSøkeTekst,
    SuggestType.Kompetanse,
  );

  const yrkeHook = useUseSugestions(yrkeSøkeTekst, SuggestType.ØnsketYrke);

  return (
    <div className='flex mt-4 mb-8'>
      <div>
        <Search
          hideLabel={true}
          label='Søk i rekrutteringstreff'
          placeholder='Søk i rekrutteringstreff'
          variant='primary'
          value={fritekstSøkTekst}
          onChange={(e) => setFritekstSøkTekst(e)}
          // onSearchClick={(e) => console.log(e)}
        />
      </div>
      {/* TODO: filtere er skjult for nå - dette skal legges tilbake når vi får implementert backend for søk */}
      {/*<AlleFilterKomponent>*/}
      {/*  <UNSAFE_Combobox*/}
      {/*    isLoading={kompetanseHook.isLoading}*/}
      {/*    selectedOptions={kompetanse}*/}
      {/*    label='Kompetanse'*/}
      {/*    options={kompetanseHook?.data ?? []}*/}
      {/*    isMultiSelect*/}
      {/*    onToggleSelected={onKompetanseSelected}*/}
      {/*    onChange={(val) => setKompetanseSøkeTekst(val)}*/}
      {/*  />*/}

      {/*  <UNSAFE_Combobox*/}
      {/*    isLoading={yrkeHook.isLoading}*/}
      {/*    selectedOptions={yrke}*/}
      {/*    label='Yrke'*/}
      {/*    options={yrkeHook?.data ?? []}*/}
      {/*    isMultiSelect*/}
      {/*    onToggleSelected={onYrkeSelected}*/}
      {/*    onChange={(val) => setYrkeSøkeTekst(val)}*/}
      {/*  />*/}
      {/*</AlleFilterKomponent>*/}
    </div>
  );
};
