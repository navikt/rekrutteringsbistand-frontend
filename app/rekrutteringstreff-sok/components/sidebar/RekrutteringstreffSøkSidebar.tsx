'use client';
import { Search, UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import {
  SuggestType,
  useUseSugestions,
} from '../../../api/kandidat-sok/useSugestions';

export const RekrutteringstreffSøkSidebar: React.FC = () => {
  const [fritekstSøkTekst, setFritekstSøkTekst] = React.useState('');

  const [kompetanse, setKompetanse] = React.useState<string[]>([]);
  const [kompetanseSøkeTekst, setKompetanseSøkeTekst] =
    React.useState<string>('');

  const [yrke, setYrke] = React.useState<string[]>([]);
  const [yrkeSøkeTekst, setYrkeSøkeTekst] = React.useState<string>('');

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
    <div className='grid gap-4'>
      <Search
        hideLabel={true}
        label='Søk i stillinger'
        placeholder='Søk i stillinger'
        variant='primary'
        value={fritekstSøkTekst}
        onChange={(e) => setFritekstSøkTekst(e)}
        onSearchClick={(e) => console.log(e)}
      />

      <UNSAFE_Combobox
        isLoading={kompetanseHook.isLoading}
        selectedOptions={kompetanse}
        label='Kompetanse'
        options={kompetanseHook?.data ?? []}
        isMultiSelect
        onToggleSelected={onKompetanseSelected}
        onChange={(val) => setKompetanseSøkeTekst(val)}
      />

      <UNSAFE_Combobox
        isLoading={yrkeHook.isLoading}
        selectedOptions={yrke}
        label='Yrke'
        options={yrkeHook?.data ?? []}
        isMultiSelect
        onToggleSelected={onYrkeSelected}
        onChange={(val) => setYrkeSøkeTekst(val)}
      />
    </div>
  );
};
