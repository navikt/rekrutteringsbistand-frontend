import { Stillingskategori } from '../../stilling-typer';
import { kategoriTilVisningsnavn } from '../../stilling-util';
import { Label, Radio, RadioGroup } from '@navikt/ds-react';
import React, { FunctionComponent, ReactNode } from 'react';

const kategorier = [Stillingskategori.Stilling, Stillingskategori.Jobbmesse];

type Props = {
  stillingskategori: Stillingskategori | null;
  setStillingskategori: (stillingskategori: Stillingskategori) => void;
  feilmelding?: ReactNode;
};

const VelgStillingskategori: FunctionComponent<Props> = ({
  stillingskategori,
  setStillingskategori,
  feilmelding,
}) => {
  const onStillingskategoriChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStillingskategori(event.target.value as Stillingskategori);
  };

  return (
    <RadioGroup
      value={stillingskategori}
      className='mb-2'
      error={feilmelding}
      legend={<Label as='span'>Hva skal du bruke stillingen til?</Label>}
    >
      {kategorier.map((kategori) => (
        <Radio
          key={kategori}
          name='stillingskategori'
          value={kategori}
          onChange={onStillingskategoriChange}
        >
          {kategoriTilVisningsnavn(kategori)}
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default VelgStillingskategori;
