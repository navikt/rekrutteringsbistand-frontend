import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import RedigerBoks from '@/app/stilling/[stillingsId]/rediger/_ui/_ui/RedigerBoks';
import {
  StillingsAnsettelsesform,
  StillingsArbeidstidsordning,
} from '@/app/stilling/_ui/stilling-typer';
import {
  BodyLong,
  Checkbox,
  CheckboxGroup,
  ErrorMessage,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@navikt/ds-react';
import { Controller, useFormContext } from 'react-hook-form';

export default function PraktiskeForhold() {
  const { control, watch } = useFormContext<StillingsDataDTO>();
  const normalizeToArray = (input: unknown): string[] => {
    if (Array.isArray(input)) return input as string[];
    if (typeof input === 'string') {
      const trimmed = input.trim();
      if (!trimmed) return [];
      // Forsøk JSON parse først
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed as string[];
      } catch {}
      // Fallback: kommaseparert liste eller enkeltverdi
      if (trimmed.includes(',')) {
        return trimmed
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      }
      return [trimmed];
    }
    return [];
  };
  return (
    <RedigerBoks tittel='Praktiske forhold'>
      <div className='flex flex-col gap-4'>
        <BodyLong>Vis frem detaljer om stillingen som har </BodyLong>
        <div className='w-[7.5rem]'>
          <Controller
            control={control}
            name='stilling.properties.positioncount'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label='Antall stillinger'
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue === '') {
                    onChange(null);
                  } else {
                    const numValue = Number(inputValue);
                    onChange(isNaN(numValue) ? null : numValue);
                  }
                }}
                value={
                  value === null || value === undefined || isNaN(Number(value))
                    ? ''
                    : String(value)
                }
                type='number'
                error={error?.message}
              />
            )}
          />
        </div>
        <div className='w-[18.75rem]'>
          <Controller
            name={'stilling.properties.engagementtype'}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Select
                value={field.value ?? ''}
                onChange={(val) => field.onChange(val)}
                label='Ansettelsesform'
                error={error?.message}
              >
                {Object.entries(StillingsAnsettelsesform).map(
                  ([key, value]) => (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  ),
                )}
              </Select>
            )}
          />
        </div>
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

          {watch('stilling.properties.extent') === 'Deltid' && (
            <Controller
              control={control}
              name={'stilling.properties.jobpercentage'}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Select
                    className='w-[300px]'
                    label='Velg omfang prosent'
                    value={value ?? undefined}
                    onChange={(e) => onChange(e.target.value)}
                  >
                    <option value=''>Velg omfang prosent</option>
                    <option value='10%'>10%</option>
                    <option value='20%'>20%</option>
                    <option value='30%'>30%</option>
                    <option value='40%'>40%</option>
                    <option value='50%'>50%</option>
                    <option value='60%'>60%</option>
                    <option value='70%'>70%</option>
                    <option value='80%'>80%</option>
                    <option value='90%'>90%</option>
                  </Select>
                  {error?.message && (
                    <ErrorMessage>{error?.message}</ErrorMessage>
                  )}
                </>
              )}
            />
          )}
        </div>
        {/* Fjernet TODO: CheckboxGroup er nå kontrollert og lagrer array direkte */}
        <div className='flex flex-col gap-8'>
          <Controller
            control={control}
            name='stilling.properties.workday'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CheckboxGroup
                legend='Arbeidsdager'
                value={normalizeToArray(value)}
                onChange={(val) => onChange(val)}
                error={error?.message}
              >
                <Checkbox value='Ukedager'>Ukedager</Checkbox>
                <Checkbox value='Lørdag'>Lørdag</Checkbox>
                <Checkbox value='Søndag'>Søndag</Checkbox>
              </CheckboxGroup>
            )}
          />

          <Controller
            control={control}
            name='stilling.properties.workhours'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CheckboxGroup
                legend='Arbeidstid'
                value={normalizeToArray(value)}
                onChange={(val) => onChange(val)}
                error={error?.message}
              >
                <Checkbox value='Dagtid'>Dag</Checkbox>
                <Checkbox value='Kveld'>Kveld</Checkbox>
                <Checkbox value='Natt'>Natt</Checkbox>
              </CheckboxGroup>
            )}
          />
        </div>
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
                {Object.entries(StillingsArbeidstidsordning).map(
                  ([key, value]) => (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  ),
                )}
              </Select>
            )}
          />
        </div>
      </div>
    </RedigerBoks>
  );
}
