import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import RedigerBoks from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/RedigerBoks';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { Controller, useFormContext } from 'react-hook-form';

const normalizeToArray = (input: unknown): string[] => {
  if (Array.isArray(input)) return input as string[];
  if (typeof input === 'string') {
    const trimmed = input.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed as string[];
    } catch {}
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

export default function Arbeidsdager({ inline }: { inline?: boolean }) {
  const { control } = useFormContext<StillingsDataDTO>();
  const content = (
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
  );
  if (inline) return content;
  return <RedigerBoks tittel='Arbeidsdager'>{content}</RedigerBoks>;
}
