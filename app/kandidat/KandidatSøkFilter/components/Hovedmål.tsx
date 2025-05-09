import { useKandidatSøkFilterContext } from '../../KandidaSokFilterContext';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

export enum HovedMålType {
  SkaffeArbeid = 'SKAFFE_ARBEID',
  BeholdeArbeid = 'BEHOLDE_ARBEID',
  ØkeDeltagelse = 'OKE_DELTAKELSE',
}

const Hovedmål: React.FC = () => {
  const { hovedmål, setHovedmål } = useKandidatSøkFilterContext();

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
      <Checkbox value={HovedMålType.ØkeDeltagelse}>
        Øke deltagelse eller mål om arbeid
      </Checkbox>
    </CheckboxGroup>
  );
};

export default Hovedmål;
