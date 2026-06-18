'use client';

import AlleFilterKomponent from '@/components/filter/AlleFilterKomponent';
import FilterPopoverKomponent from '@/components/filter/FilterPopoverKomponent';
import ValgteFiltre, { FilterItem } from '@/components/filter/ValgteFiltre';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { FC } from 'react';

export interface Arbeidsgivervalg {
  orgnr: string;
  orgnavn: string;
}

interface Props {
  arbeidsgivervalg: Arbeidsgivervalg[];
  valgteArbeidsgivere: string[];
  setValgteArbeidsgivere: (orgnr: string[]) => void;
}

const ArbeidsgiverFilter: FC<Props> = ({
  arbeidsgivervalg,
  valgteArbeidsgivere,
  setValgteArbeidsgivere,
}) => (
  <CheckboxGroup
    legend='Arbeidsgiver'
    value={valgteArbeidsgivere}
    onChange={setValgteArbeidsgivere}
  >
    {arbeidsgivervalg.map((arbeidsgiver) => (
      <Checkbox key={arbeidsgiver.orgnr} value={arbeidsgiver.orgnr}>
        {arbeidsgiver.orgnavn}
      </Checkbox>
    ))}
  </CheckboxGroup>
);

const FormidlingFilterrad: FC<Props> = (props) => {
  const { arbeidsgivervalg, valgteArbeidsgivere, setValgteArbeidsgivere } =
    props;

  const orgnavnForOrgnr = (orgnr: string) =>
    arbeidsgivervalg.find((a) => a.orgnr === orgnr)?.orgnavn ?? orgnr;

  const filtre: FilterItem[] = [
    {
      type: valgteArbeidsgivere,
      setVerdi: setValgteArbeidsgivere,
      mapVerdiNavn: orgnavnForOrgnr,
    },
  ];

  const harAktiveFiltre = valgteArbeidsgivere.length > 0;

  return (
    <div>
      <div className='flex flex-wrap items-center gap-4'>
        <div className='hidden md:flex md:items-center md:gap-4'>
          <FilterPopoverKomponent
            tittel='Arbeidsgiver'
            placement='bottom-start'
          >
            <ArbeidsgiverFilter {...props} />
          </FilterPopoverKomponent>
        </div>

        <div className='ml-auto md:hidden'>
          <AlleFilterKomponent>
            <ArbeidsgiverFilter {...props} />
          </AlleFilterKomponent>
        </div>
      </div>

      <div className='mt-4 w-full'>
        <ValgteFiltre
          filtre={filtre}
          tømFiltreProps={
            harAktiveFiltre
              ? { fjernFritekst: () => setValgteArbeidsgivere([]) }
              : undefined
          }
        />
      </div>
    </div>
  );
};

export default FormidlingFilterrad;
