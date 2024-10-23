import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { useKandidatSøkFilter } from '../../../KandidaSokContext';

export enum HovedMålType {
  SkaffeArbeid = 'SKAFFEA',
  BeholdeArbeid = 'BEHOLDEA',
  ØkeDeltagelse = 'OKEDELT',
}

const Hovedmål: React.FC = () => {
  const { hovedmål, setHovedmål } = useKandidatSøkFilter();

  const onChange = (valgteHovedmål: HovedMålType[]) => {
    setHovedmål(valgteHovedmål);
  };

  return (
    <CheckboxGroup
      legend='Velg kandidatens mål'
      value={hovedmål}
      onChange={onChange}
    >
      <Checkbox value={HovedMålType.SkaffeArbeid}>Skaffe arbeid</Checkbox>
      <Checkbox value={HovedMålType.BeholdeArbeid}>Beholde arbeid</Checkbox>
      <Checkbox value={HovedMålType.ØkeDeltagelse}>Øke deltagelse</Checkbox>
    </CheckboxGroup>
  );
};

export default Hovedmål;
