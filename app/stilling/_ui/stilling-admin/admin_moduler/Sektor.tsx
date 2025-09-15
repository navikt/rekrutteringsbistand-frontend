import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import RedigerBoks from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/RedigerBoks';
import { Radio, RadioGroup } from '@navikt/ds-react';
import { Controller, useFormContext } from 'react-hook-form';

export default function Sektor() {
  const { control } = useFormContext<StillingsDataDTO>();
  return (
    <RedigerBoks tittel='Sektor'>
      <Controller
        control={control}
        name='stilling.properties.sector'
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <RadioGroup
            legend='Velg sektor'
            value={value ?? ''}
            onChange={(val) => onChange(val)}
            error={error?.message}
          >
            <Radio value='Privat'>Privat</Radio>
            <Radio value='Offentlig'>Offentlig</Radio>
          </RadioGroup>
        )}
      />
    </RedigerBoks>
  );
}
