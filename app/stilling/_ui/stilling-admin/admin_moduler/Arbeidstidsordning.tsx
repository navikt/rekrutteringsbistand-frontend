import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import RedigerBoks from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/RedigerBoks';
import { StillingsArbeidstidsordning } from '@/app/stilling/_ui/stilling-typer';
import { Select } from '@navikt/ds-react';
import { Controller, useFormContext } from 'react-hook-form';

export default function Arbeidstidsordning({ inline }: { inline?: boolean }) {
  const { control } = useFormContext<StillingsDataDTO>();
  const content = (
    <div className='w-[18.75rem]'>
      <Controller
        name={'stilling.properties.jobarrangement'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Select
            value={field.value ?? ''}
            onChange={(val) => field.onChange(val)}
            label='Arbeidstidsordning (valgfritt)'
            error={error?.message}
          >
            <option value=''>Velg</option>
            {Object.entries(StillingsArbeidstidsordning).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </Select>
        )}
      />
    </div>
  );
  if (inline) return content;
  return <RedigerBoks tittel='Arbeidstidsordning'>{content}</RedigerBoks>;
}
