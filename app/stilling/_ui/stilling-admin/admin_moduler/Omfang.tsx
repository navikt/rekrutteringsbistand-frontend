import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import RedigerBoks from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/RedigerBoks';
import { ErrorMessage, Radio, RadioGroup, Select } from '@navikt/ds-react';
import { Controller, useFormContext } from 'react-hook-form';

export default function Omfang({ inline }: { inline?: boolean }) {
  const { control, watch } = useFormContext<StillingsDataDTO>();
  const extent = watch('stilling.properties.extent');
  const content = (
    <div className='flex flex-col gap-4'>
      <Controller
        control={control}
        name={'stilling.properties.extent'}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <RadioGroup
            error={error?.message}
            legend='Velg omfang'
            value={value ?? ''}
            onChange={(e) => onChange(e)}
          >
            <Radio value='Heltid'>Heltid (100%)</Radio>
            <Radio value='Deltid'>Deltid</Radio>
          </RadioGroup>
        )}
      />
      {extent === 'Deltid' && (
        <Controller
          control={control}
          name={'stilling.properties.jobpercentage'}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Select
                className='w-[300px]'
                label='Velg omfang prosent'
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value)}
              >
                <option value=''>Velg omfang prosent</option>
                {Array.from({ length: 9 }, (_, i) => (i + 1) * 10).map(
                  (pct) => (
                    <option key={pct} value={`${pct}%`}>
                      {pct}%
                    </option>
                  ),
                )}
              </Select>
              {error?.message && <ErrorMessage>{error?.message}</ErrorMessage>}
            </div>
          )}
        />
      )}
    </div>
  );
  if (inline) return content;
  return <RedigerBoks tittel='Omfang'>{content}</RedigerBoks>;
}
