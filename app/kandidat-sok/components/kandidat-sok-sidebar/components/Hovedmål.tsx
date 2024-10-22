import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { useKandidatSøkFilter } from '../../../KandidaSokContext';

export enum Mål {
  SkaffeArbeid = 'SKAFFEA',
  BeholdeArbeid = 'BEHOLDEA',
  ØkeDeltagelse = 'OKEDELT',
}

const Hovedmål = () => {
  const { hovedmål, setHovedmål } = useKandidatSøkFilter();

  const onChange = (valgteHovedmål: Mål[]) => {
    setHovedmål(valgteHovedmål);
  };

  return (
    <CheckboxGroup
      legend='Velg kandidatens mål'
      value={hovedmål}
      onChange={onChange}
    >
      <Checkbox value={Mål.SkaffeArbeid}>Skaffe arbeid</Checkbox>
      <Checkbox value={Mål.BeholdeArbeid}>Beholde arbeid</Checkbox>
      <Checkbox value={Mål.ØkeDeltagelse}>Øke deltagelse</Checkbox>
    </CheckboxGroup>
  );
};

export default Hovedmål;
