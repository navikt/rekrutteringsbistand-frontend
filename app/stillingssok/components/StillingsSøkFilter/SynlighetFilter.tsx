import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import * as React from 'react';
import { TilgangskontrollForInnhold } from '../../../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Rolle } from '../../../../types/Roller';
import { storForbokstav } from '../../../kandidatsok/util';
import { useStillingsSøkFilter } from '../../StillingsSøkContext';

export enum Publisert {
  Intern = 'intern',
  Arbeidsplassen = 'arbeidsplassen',
  Dev = 'developer',
}

const SynlighetFilter: React.FC = () => {
  const { publisert, setPublisert } = useStillingsSøkFilter();

  return (
    <CheckboxGroup
      legend='Synlighet'
      hideLegend={false}
      onChange={setPublisert}
      value={publisert}
    >
      <Checkbox value={Publisert.Intern}>
        {storForbokstav(Publisert.Intern)}
      </Checkbox>
      <Checkbox value={Publisert.Arbeidsplassen}>
        {storForbokstav(Publisert.Arbeidsplassen)}
      </Checkbox>
      <TilgangskontrollForInnhold
        skjulVarsel
        kreverEnAvRollene={[Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]}
      >
        <Checkbox value={Publisert.Dev}>
          {storForbokstav(Publisert.Dev)}
        </Checkbox>
      </TilgangskontrollForInnhold>
    </CheckboxGroup>
  );
};

export default SynlighetFilter;
