import { useKandidatSøkFilterContext } from '../../KandidaSokFilterContext';
import {
  filtrerbareInnsatsgrupper,
  Innsatsgruppe,
} from '../../components/innsatsgrupper';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

const Innsatsgrupper = () => {
  const { innsatsgruppe, setInnsatsgruppe } = useKandidatSøkFilterContext();

  const onChange = (valgteInnsatsgrupper: Innsatsgruppe[]) => {
    setInnsatsgruppe(valgteInnsatsgrupper);
  };

  return (
    <CheckboxGroup
      legend='Velg innsatsgrupper'
      onChange={onChange}
      value={Array.from(innsatsgruppe)}
    >
      {Object.entries(filtrerbareInnsatsgrupper).map(([kode, gruppe]) => (
        <Checkbox key={kode} value={kode} description={gruppe.description}>
          {gruppe.label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};

export default Innsatsgrupper;
