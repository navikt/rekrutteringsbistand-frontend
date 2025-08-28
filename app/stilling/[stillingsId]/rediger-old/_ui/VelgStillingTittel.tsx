import { useStillingsTittel } from '@/app/api/pam-ontologi/stillingsTittel/useStillingsTittel';
import { CategorySchemaDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { mapJanzzTilKategori } from '@/app/stilling/[stillingsId]/rediger-old/mapStilling';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';

export interface VelgStillingTittelProps {
  categoryList?: CategorySchemaDTO[] | null;
  callBack: (category: CategorySchemaDTO[]) => void;
  error?: string;
}

const VelgStillingTittel: React.FC<VelgStillingTittelProps> = ({
  callBack,
  categoryList,
  error,
}) => {
  const [valg, setValg] = React.useState<{ label: string; value: string }[]>(
    [],
  );
  const [søkeVerdi, setSøkeVerdi] = React.useState<string>('');

  const hook = useStillingsTittel(søkeVerdi.length > 1 ? søkeVerdi : undefined);

  React.useEffect(() => {
    if (hook.data) {
      const nyeValg =
        hook.data
          .filter(
            (f) => f.styrk08 && f.styrk08.trim() !== '' && f.styrk08 !== '9999',
          )
          .map((item) => {
            return {
              label: item.label,
              value: item.label,
            };
          }) ?? [];
      setValg(nyeValg);
    }
  }, [hook.data]);
  return (
    <UNSAFE_Combobox
      error={error}
      placeholder={
        categoryList?.find((item) => item.categoryType === 'JANZZ')?.name ?? ''
      }
      value={søkeVerdi}
      label='Velg yrkestittel (Janzz yrkesontologi)'
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
          callBack(mapJanzzTilKategori(janzz));
        }
      }}
    />
  );
};

export default VelgStillingTittel;
