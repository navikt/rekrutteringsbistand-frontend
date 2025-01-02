import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import { useStillingsTittel } from '../../../../api/pam-ontologi/stillingsTittel/useStillingsTittel';
import { CategorySchemaDTO } from '../../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';

export interface VelgStillingTittelProps {
  valgtTittel?: string;
  callBack: (category: CategorySchemaDTO) => void;
}

const VelgStillingTittel: React.FC<VelgStillingTittelProps> = ({
  callBack,
  valgtTittel,
}) => {
  const [valg, setValg] = React.useState<{ label: string; value: string }[]>(
    [],
  );
  const [søkeVerdi, setSøkeVerdi] = React.useState<string>(valgtTittel ?? '');

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
      toggleListButton={false}
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
          callBack({
            id: janzz.konseptId,
            code: janzz.konseptId.toString(),
            categoryType: 'JANZZ',
            name: janzz.label,
            description: null,
            parentId: null,
          });
        }
      }}
    />
  );
};

export default VelgStillingTittel;
