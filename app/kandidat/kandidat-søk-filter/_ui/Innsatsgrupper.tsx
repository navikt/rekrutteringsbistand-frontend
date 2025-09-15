import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import {
  filtrerbareInnsatsgrupper,
  Innsatsgruppe,
} from '@/app/kandidat/_ui/innsatsgrupper';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

const Innsatsgrupper = () => {
  const { innsatsgruppe, setInnsatsgruppe } = useKandidatSøkFilterContext();

  const onChange = (valgteInnsatsgrupper: Innsatsgruppe[]) => {
    setInnsatsgruppe(valgteInnsatsgrupper);
  };

  return (
    <CheckboxGroup
      size='small'
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
