import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import { HovedMålType } from '@/app/kandidat/_util/kandidatsøk-typer';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

export default function Hovedmål() {
  const { hovedmål, setHovedmål } = useKandidatSøkFilterContext();

  const onChange = (valgteHovedmål: HovedMålType[]) => {
    setHovedmål(valgteHovedmål);
  };

  return (
    <CheckboxGroup
      size='small'
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
}
