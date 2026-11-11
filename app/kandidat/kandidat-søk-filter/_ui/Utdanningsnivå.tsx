import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import { Nivå } from '@/app/kandidat/_util/kandidatsøk-typer';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

const Utdanningsnivå = () => {
  const { utdanningsnivå, setUtdanningsnivå } = useKandidatSøkFilterContext();
  const onChange = (valgtNivå: Nivå[]) => {
    setUtdanningsnivå(valgtNivå);
  };

  return (
    <CheckboxGroup
      size='small'
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
