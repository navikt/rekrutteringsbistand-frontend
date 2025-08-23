import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

export enum Nivå {
  Videregående = 'videregaende',
  Fagskole = 'fagskole',
  Bachelor = 'bachelor',
  Master = 'master',
  Doktorgrad = 'doktorgrad',
}

const Utdanningsnivå = () => {
  const { utdanningsnivå, setUtdanningsnivå } = useKandidatSøkFilterContext();
  const onChange = (valgtNivå: Nivå[]) => {
    setUtdanningsnivå(valgtNivå);
  };

  return (
    <CheckboxGroup
      legend='Utdanningsnivå'
      description='Velg ett eller flere nivåer'
      value={utdanningsnivå}
      onChange={onChange}
    >
      <Checkbox value={Nivå.Videregående}>Videregående</Checkbox>
      <Checkbox value={Nivå.Fagskole}>Fagskole</Checkbox>
      <Checkbox value={Nivå.Bachelor}>
        Universitet/høgskole inntil 4 år
      </Checkbox>
      <Checkbox value={Nivå.Master}>Universitet/høgskole over 4 år</Checkbox>
      <Checkbox value={Nivå.Doktorgrad}>Doktorgrad (PhD)</Checkbox>
    </CheckboxGroup>
  );
};

export default Utdanningsnivå;
