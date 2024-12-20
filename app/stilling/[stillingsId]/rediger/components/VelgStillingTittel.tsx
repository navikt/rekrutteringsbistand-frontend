import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import {
  stillingsTittelDTO,
  useStillingsTittel,
} from '../../../../api/pam-ontologi/stillingsTittel/useStillingsTittel';

export interface VelgStillingTittelProps {
  callBack: (poststed: stillingsTittelDTO) => void;
}

const VelgStillingTittel: React.FC<VelgStillingTittelProps> = ({
  callBack,
}) => {
  const [valg, setValg] = React.useState<{ label: string; value: string }[]>(
    [],
  );
  const [søkeVerdi, setSøkeVerdi] = React.useState<string>('');

  const hook = useStillingsTittel(søkeVerdi.length > 1 ? søkeVerdi : undefined);

  React.useEffect(() => {
    if (hook.data) {
      const nyeValg = hook.data.map((item) => {
        return {
          label: item.label,
          value: item.label,
        };
      });
      setValg(nyeValg);
    }
  }, [hook.data]);

  return (
    <UNSAFE_Combobox
      value={søkeVerdi}
      label='Velg yrkestittel (standard for yrkesklassifisering - JANZZ)'
      isLoading={hook.isLoading}
      options={valg}
      shouldAutocomplete
      onChange={(value) => {
        setSøkeVerdi(value);
      }}
      isListOpen={søkeVerdi.length > 1}
      onToggleSelected={(value) => {
        const janzz = hook.data
          ? hook.data.find((item) => item.label === value)
          : null;
        if (janzz) {
          callBack(janzz);
        }
      }}
    />
  );
};

export default VelgStillingTittel;
