import { useStillingsTittel } from '@/app/api/pam-ontologi/stillingsTittel/useStillingsTittel';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import RedigerBoks from '@/app/stilling/[stillingsId]/rediger/_ui/RedigerBoks';
import { mapJanzzTilKategori } from '@/app/stilling/[stillingsId]/rediger/_util/mapJanzz';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function Stillingstittel() {
  const { setValue } = useFormContext<StillingsDataDTO>();

  const { stillingsData } = useStillingsContext();
  const [valg, setValg] = useState<{ label: string; value: string }[]>([]);
  const [søkeVerdi, setSøkeVerdi] = useState<string>('');

  const hook = useStillingsTittel(søkeVerdi.length > 1 ? søkeVerdi : undefined);

  useEffect(() => {
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
    <RedigerBoks tittel='Hva arbeidsgiver leter etter'>
      <UNSAFE_Combobox
        //   error={error}
        placeholder={
          stillingsData.stilling?.categoryList?.find(
            (item) => item.categoryType === 'JANZZ',
          )?.name ?? ''
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
            const janzzKategori = mapJanzzTilKategori(janzz);
            setValue('stilling.categoryList', janzzKategori);
          }
        }}
      />
    </RedigerBoks>
  );
}
