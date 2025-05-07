import { useKandidatSøkFilterContext } from '../../KandidaSokFilterContext';
import { Checkbox, CheckboxGroup, HelpText, useId } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

export enum PrioritertMålgruppe {
  UngeUnderTrettiÅr = 'unge',
  SeniorFemtiPluss = 'senior',
  HullICv = 'hullICv',
}

const PrioriterteMålgrupper: FunctionComponent = () => {
  const hjelpetekstId = useId();
  const { prioritertMålgruppe, setPrioritertMålgruppe } =
    useKandidatSøkFilterContext();
  const onChange = (valgteMålgrupper: PrioritertMålgruppe[]) => {
    setPrioritertMålgruppe(valgteMålgrupper);
  };

  return (
    <CheckboxGroup
      legend='Velg prioriterte målgrupper'
      onChange={onChange}
      value={prioritertMålgruppe}
    >
      <Checkbox value={PrioritertMålgruppe.UngeUnderTrettiÅr}>
        Unge under 30 år
      </Checkbox>
      <Checkbox value={PrioritertMålgruppe.SeniorFemtiPluss}>
        Senior 50+
      </Checkbox>
      <div>
        <div className='flex'>
          <Checkbox
            value={PrioritertMålgruppe.HullICv}
            aria-describedby={hjelpetekstId}
          >
            Har hull i CV-en
          </Checkbox>

          <HelpText id={hjelpetekstId} title='Hva er hull i CV-en?'>
            Du får treff på kandidater som ikke har registrert jobb eller
            utdanning i CV-en i en sammenhengende periode på 2 år i løpet av de
            siste 5 årene.
          </HelpText>
        </div>
      </div>
    </CheckboxGroup>
  );
};

export default PrioriterteMålgrupper;
