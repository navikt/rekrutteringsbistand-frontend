import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { useKandidatSøkFilter } from '../../../KandidaSokContext';
import { filtrerbareInnsatsgrupper, Innsatsgruppe } from '../../innsatsgrupper';

const Innsatsgrupper = () => {
  const { innsatsgruppe, setInnsatsgruppe } = useKandidatSøkFilter();

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
